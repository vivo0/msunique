import os 
from pinecone import Pinecone
import time
from pinecone import ServerlessSpec
import json
from tokenizers import Tokenizer
from semantic_text_splitter import TextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from dotenv import load_dotenv

load_dotenv()
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
pinecone = Pinecone(api_key=PINECONE_API_KEY)

class Vectorstore:
    def __init__(self, index_name, similarity_metric='cosine'):
        self.index_name = index_name
        self.similarity_metric = similarity_metric
        self.index = None
        self.namespaces = set()
        self.pinecone_api_key = PINECONE_API_KEY
        self.pinecone = Pinecone(api_key=PINECONE_API_KEY)
        
    def initialize_vectorstore(self):
        """
        Initializes the Pinecone vector store. Creates a new index if it does not exist.

        Returns:
            - self.index (object): Reference to the Pinecone index.
        """
        pc = Pinecone(api_key=self.pinecone_api_key)
        existing_indexes = [index_info["name"] for index_info in pc.list_indexes()]

        if self.index_name in existing_indexes:
            self.index = pc.Index(self.index_name)
        else:
            pc.create_index(
                self.index_name,
                dimension=1536,  # dimensionality of ada 002
                metric=self.similarity_metric,
                spec=ServerlessSpec(
                    cloud="aws",
                    region="us-west-2",
                )
            )
            time.sleep(3)
            self.index = pc.Index(self.index_name)
        return self.index
    

    def process_documents(self, folder):
        # check if folder exists

        if not os.path.exists(folder):
            print(f"Folder {folder} does not exist")
            return
        else:
            print(f"Processing documents in {folder}")

        # 
        # itera su ogni sottocartella e file
        for root, dirs, files in os.walk(folder):
            for file in files:
                if file.endswith(".json"):
                    # extract filename
                    # filename = file.split(".")[0].lower()
                    # self.index_name = filename
                    print(f"Processing {file}")
                    self.process_document(os.path.join(root, file))


    def process_document(self, file):
        if self.index_name not in [el.name for el in self.pinecone.list_indexes()]:
            print("Creating index")
            self.pinecone.create_index(name=self.index_name, dimension=1536, metric="cosine", spec = ServerlessSpec(cloud="aws", region="us-west-2"))
        documents = []
        split_filename = file.split(os.sep)
        split_file_type = split_filename[-1].split(".")

        if len(split_file_type) > 1:
            namespace_name = split_file_type[-2]

            if split_file_type[-1] == "json":
                with open(file, 'r') as file:
                    data = json.load(file)
                    doc_info = {"name": split_filename[-1], "type": split_file_type[-1]}
                    docs_info = [doc_info | el for el in data]
                    documents.extend(docs_info)

        # CHUNKING
        max_tokens = 512
        tokenizer = Tokenizer.from_pretrained("bert-base-uncased")
        splitter = TextSplitter.from_huggingface_tokenizer(tokenizer, max_tokens)

        print(f"Processing {len(documents)} documents")
        # print documents keys


        list_of_documents_chunked = []
        for doc in documents:
            text = doc["content"]
            doc_chunked = splitter.chunks(text)
            for i, chunk in enumerate(doc_chunked):
                # create doc_info without "description"
                doc_info = {k: v for k, v in doc.items() if k != "description"}
                doc_info["chunk_id"] = i
                doc_info["value"] = chunk
                # remove "content" key
                # doc_info.pop("content")
                list_of_documents_chunked.append(doc_info)

        # EMBEDDING
        embedder = OpenAIEmbeddings(model="text-embedding-ada-002")

        batch_size = 50
        vector_list = []
        id = 0
        for i in range(0, len(documents), batch_size):
            i_end = min(i + batch_size, len(documents))
            data = documents[i:i_end]
            texts = [doc["content"] for doc in data]

            metadata = [data[i] for i in range(len(data))]
            embeds = embedder.embed_documents(texts)

            # add to pinecone without explicit id
            for j, embed in enumerate(embeds):
                vector = {}
                vector["id"] = data[j]["name"] + "_" + str(id)
                vector["values"] = embed
                metadata[j]["text"] = metadata[j].pop("content") # value
                # metadata[j].pop("value")
                metadata[j]["namespace"] = namespace_name
                vector["metadata"] = metadata[j]

                vector_list.append(vector)
                id += 1

        print(f"vector_list: {len(vector_list)}")

        # top 10 most large elements:

        vector_list.sort(key=lambda x: len(x["metadata"]["text"]), reverse=True)
        
        # split text in two parts
        while 1:
            el = vector_list[0]
            if len(el["metadata"]["text"]) < 40000:
                break
            print(f"len: {len(el['metadata']['text'])}, text: {el['metadata']['section']}")
            vector_list.remove(el)
            el1 = el.copy()
            el2 = el.copy()
            el1["metadata"]["text"] = vector_list[0]["metadata"]["text"][:len(vector_list[0]["metadata"]["text"]) // 2]
            el2["metadata"]["text"] = vector_list[0]["metadata"]["text"][len(vector_list[0]["metadata"]["text"]) // 2:]
            vector_list.append(el1)
            vector_list.append(el2)
            vector_list.sort(key=lambda x: len(x["metadata"]["text"]), reverse=True)

        self.namespaces.add(namespace_name)
        with open("namespaces.txt", "w") as file:
            file.write("\n".join(self.namespaces))
        
        # divide the vector in two parts
        vl1 = vector_list[:len(vector_list) // 2]
        vl2 = vector_list[len(vector_list) // 2:]

        self.index = self.pinecone.Index(self.index_name)
        self.index.upsert(vectors=vl1)
        self.index.upsert(vectors=vl2)
        return vector_list
    
    def query_namespace(self, query_vector: str, namespaces: list, num_records=3):
        """
        Queries the Pinecone store to find documents similar to the query vector within specific namespaces.

        Parameters:
            - query_vector (str): Query vector.
            - namespaces (list): List of namespaces to query.
            - num_records (int): Number of records to return (default: 3).

        Returns:
            - docs (List): List of found documents.
        """
        docsearch = PineconeVectorStore.from_existing_index(self.index_name, self.embed_model.embed_model)
        docsearch.as_retriever(include_metadata=True, search_kwargs={"k": num_records, 'filter': {'namespace': namespaces}})
        docs = docsearch.similarity_search(query_vector)
        return docs
    

if __name__ == "__main__":
    index_name = "swisshackaton"
    vs = Vectorstore(index_name)
    vs.process_documents("backend/parsed_docs")
    print("done")


