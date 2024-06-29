import json


# Funzione per iterare su tutti i contenuti
def parse_file(input_file, index_file, output_file):
    with open(input_file, 'r') as file:
        data = json.load(file)
    with open(index_file, 'r') as file:
        index = json.load(file)

    start_page, end_page = index[0]["Page Range"].split("-")
    start_page = int(start_page) + 2
    end_page = int(end_page) + 2
    index_number = 1
    i = 0
    contents = []
    paragraphs = data["analyzeResult"]["paragraphs"]

    paragraph_data = {"section": index[0]["Index Name"], "content": "", "index": index_number}
    for paragraph in paragraphs:
        if i >= len(index) - 1:
            break
        page_number = paragraph["boundingRegions"][0]["pageNumber"]
        index_page_number = int(index[i]["Page Range"].split("-")[0]) + 2
        if page_number < start_page:
            continue

        elif page_number >= start_page and page_number <= end_page:
            print("page number", page_number)
            print("paragraph", paragraph["content"])
            print("index", index[i]["Index Name"])
            print("index page", index_page_number)
            print("\n\n\n\n\n")
            if (index[i]["Index Name"]).lower() in (paragraph["content"]).lower() and page_number in [index_page_number - 1, index_page_number, index_page_number + 1]:
                print("Nuovo paragrafo", paragraph["content"])
                print("paragraph data", paragraph_data)
                contents.append(paragraph_data)
                start_page = page_number
                index_number += 0.1
                i += 1
                paragraph_data = paragraph_data.copy()
                paragraph_data["section"] = index[i]["Index Name"]
                paragraph_data["content"] = ""
                paragraph_data["index"] = index_number
            else:
                paragraph_data["content"] += paragraph["content"] + " "
                # print("Adding content from page", paragraph_data)

        elif page_number > end_page:
            print("page number", page_number)
            print("end page", end_page)
            print("paragraph in END", paragraph_data["section"])
            print("paragraph in end", paragraph_data["content"], "\n\n")
            contents.append(paragraph_data)
            index_number += 1            
            index_number = int(index_number)
            if len(index[i]["Page Range"].split("-")) == 1:
                print("END OF FILE REACHED")
                break
            start_page, end_page = index[i]["Page Range"].split("-")
            start_page = int(start_page) + 2
            end_page = int(end_page) + 2
            i += 1
            paragraph_data = paragraph_data.copy()
            paragraph_data["section"] = index[i]["Index Name"]
            paragraph_data["content"] = ""
            paragraph_data["index"] = index_number
            print("index[i]", index[i]["Index Name"])
            

    print("contents", len(contents))
    # print all the contents
    with open(output_file, 'w') as file:
        json.dump(contents, file, indent=4)

    return contents

parse_file("Data/IBM/2022.json", "doc_contents/IBM_2022_index.json", "IBM2022.json")



    



