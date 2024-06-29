import os
from langchain_pinecone import PineconeVectorStore
from langchain_openai import ChatOpenAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import OpenAIEmbeddings
from langchain.chains import RetrievalQA  
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from dotenv import load_dotenv

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")

class Bot:
    def __init__(self, vectorstore):
        self.vectorstore = vectorstore
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.model_name = "gpt-4o"

    def get_metric(self, metric, namespace):
        llm = ChatOpenAI(temperature=0,model_name=self.model_name)
        # qa = RetrievalQA.from_chain_type(
        #     llm=llm,
        #     chain_type="stuff",
        #     retriever=self.vectorstore.as_retriever()
        # )

        template = """ You are an application that returns only: Numbers, Numbers+% (if necessary), or just "-" in case there is no number or number with % or a negative number with the "-" in front or a number with "m" in front!

Never provide anything different than a number or number+% or the number with "m" in front or a negative number with the "-" in front; NEVER!
When there is $ before a number, please provide $+number.
When I will ask for one metric, you will return a number or number+% or a negative number with the "-" in front or the number with "m" in front




You will be asked the metrics below, if you cannot find or provide a number with "-" before the number or the number with "m" in front or with "%", please provide "-"

Please find the {metric} that you need to find in the context below:
{context}


metric: 
Net Revenue
Net Interest Income
Net Income
Operating Expenses
Non-Interest Income
Interest Expense
Provision for Credit Losses
Salaries and Wages
General and Administrative Expenses
Depreciation and Amortization
Non-Interest Expenses
Operating Income
Pre-Tax Income
Gross Profit Margin

Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA)
Earnings Per Share (EPS)
Net Profit Margin
Price to Earnings (P/E) Ratio
Dividend Payout Ratio
Price to Book (P/B) Ratio
Earnings Yield
Book Value per Share
Tangible Book Value per Share
Common Equity Tier 1 (CET1) Ratio
Tier 1 Capital Ratio
Risk-Weighted Assets (RWA)
Capital Adequacy Ratio (CAR)
Liquidity Coverage Ratio (LCR)
Net Stable Funding Ratio (NSFR)
Return on Risk-Weighted Assets (RoRWA)
Provision Coverage Ratio
Allowance for Loan Losses
Return on Assets (ROA)
Return on Equity (ROE)
Net Interest Margin (NIM)
Efficiency Ratio
Cost-to-Income Ratio
Debt to Equity Ratio
Debt to Assets Ratio
Equity Multiplier
Asset Turnover Ratio
Inventory Turnover Ratio
Operating Efficiency Ratio
Interest Coverage Ratio
"""

        # template = "I'll send you a context and a metric, you need to find the metric in the context and return the value. The metric is {metric} and the context is {context}"


        prompt = ChatPromptTemplate.from_template(template)

        rag_chain = (
            {"context": self.vectorstore.as_retriever(include_metadata=True, search_kwargs={"k": 3, 'filter': {'namespace': namespace}}), "metric": RunnablePassthrough()}
            | prompt
            | llm
            | StrOutputParser()
        )
        
        query = "cash flows from operating activities"
        # docs = self.vectorstore.similarity_search(query)
        # print(docs)
        # print(rag_chain.invoke(metric))
        return rag_chain.invoke(metric)

if __name__ == "__main__":
    os.environ["PINECONE_API_KEY"] = os.getenv("PINECONE_API_KEY")
    embedder = OpenAIEmbeddings(model="text-embedding-ada-002")
    vectorstore = PineconeVectorStore.from_existing_index("swisshackaton", embedder)
    bot = Bot(vectorstore)
    bot.get_metric("EPS 2021", "IBM2022")


            
