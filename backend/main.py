from fastapi import FastAPI
from pathlib import Path
import sys
from langchain_pinecone import PineconeVectorStore
from langchain_openai import OpenAIEmbeddings
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
from bot import Bot
import os
import time
from retrying import retry
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

METRICS = [
    "Net Revenue",
    "Net Interest Income",
    "Net Income",
    "Operating Expenses",
    "Non-Interest Income",
    "Interest Expense",
    "Provision for Credit Losses",
    "Salaries and Wages",
    "General and Administrative Expenses",
    "Depreciation and Amortization",
    "Non-Interest Expenses",
    "Operating Income",
    "Pre-Tax Income",
    "Gross Profit Margin",
    "Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA)",
    "Earnings Per Share (EPS)",
    "Net Profit Margin",
    "Price to Earnings (P/E) Ratio",
    "Dividend Payout Ratio",
    "Price to Book (P/B) Ratio",
    "Earnings Yield",
    "Book Value per Share",
    "Tangible Book Value per Share",
    "Common Equity Tier 1 (CET1) Ratio",
    "Tier 1 Capital Ratio",
    "Risk-Weighted Assets (RWA)",
    "Capital Adequacy Ratio (CAR)",
    "Liquidity Coverage Ratio (LCR)",
    "Net Stable Funding Ratio (NSFR)",
    "Return on Risk-Weighted Assets (RoRWA)",
    "Provision Coverage Ratio",
    "Allowance for Loan Losses",
    "Return on Assets (ROA)",
    "Return on Equity (ROE)",
    "Net Interest Margin (NIM)",
    "Efficiency Ratio",
    "Cost-to-Income Ratio",
    "Debt to Equity Ratio",
    "Debt to Assets Ratio",
    "Equity Multiplier",
    "Asset Turnover Ratio",
    "Inventory Turnover Ratio",
    "Operating Efficiency Ratio",
    "Interest Coverage Ratio"
]

app = FastAPI()

origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
os.environ["PINECONE_API_KEY"] = os.getenv("PINECONE_API_KEY")

embedder = OpenAIEmbeddings(model="text-embedding-ada-002")
vectorstore = PineconeVectorStore.from_existing_index("swisshackaton", embedder)
bot = Bot(vectorstore)

def calculate_metrics():
    print("Calculating metrics...")
    with open("namespaces.txt", "r") as file:
        namespaces = file.read().split("\n")

    results = {namespace: {} for namespace in namespaces}

    with ThreadPoolExecutor() as executor:
        future_to_namespace_metric = {
            executor.submit(fetch_metric, metric, namespace): (namespace, metric) 
            for namespace in namespaces for metric in METRICS
        }
        future_to_namespace_description = {
            executor.submit(fetch_description, namespace): namespace 
            for namespace in namespaces
        }
        
        for future in as_completed({**future_to_namespace_metric, **future_to_namespace_description}):
            if future in future_to_namespace_metric:
                namespace, metric = future_to_namespace_metric[future]
                try:
                    result = future.result()
                    results[namespace].update(result)
                except Exception as exc:
                    results[namespace][metric] = f"Failed after retries: {exc}"
            else:
                namespace = future_to_namespace_description[future]
                try:
                    result = future.result()
                    results[namespace].update(result)
                except Exception as exc:
                    results[namespace]["description"] = f"Failed after retries: {exc}"

    # dump in a json file
    with open("metrics.json", mode='w') as file:
        json.dump(results, file, indent=4)

    return results

# Retry configuration: retry up to 3 times, wait 1 minute between retries
@retry(stop_max_attempt_number=5, wait_fixed=15000)
def fetch_metric(metric, namespace):
    try:
        metric_prediction = bot.get_metric(metric, namespace)

        return {metric: metric_prediction}
    except Exception as exc:
        print(f"Exception occurred: {exc}. Retrying...")
        raise

@retry(stop_max_attempt_number=5, wait_fixed=15000)
def fetch_description(namespace):
    try:
        response = bot.get_response("write a description of the company. Don't introduce the description but just write it", namespace)
        return {"description": response}
    except Exception as exc:
        print(f"Exception occurred: {exc}. Retrying...")
        raise

@app.get("/get-metrics")
def get_metrics():
    # return json file
    if Path("metrics.json").exists():
        with open("metrics.json", mode='r') as file:
            return json.load(file)
    else:
        return calculate_metrics()

@app.post("/chatbot")
def post_query(query_data: dict):
    query = query_data.get("query")
    namespaces = query_data.get("company")
    responses = []
    with ThreadPoolExecutor() as executor:
        futures = {executor.submit(bot.get_response, query, namespace, None): namespace for namespace in namespaces}
        
        for future in as_completed(futures):
            namespace = futures[future]
            try:
                response = future.result()
                responses.append(response)
            except Exception as exc:
                responses.append(f"Failed to get response for {namespace}: {exc}")
    
    if len(namespaces) == 1:
        print(f"Response: {responses[0]}")
        return {"response": responses[0]}
    else:
        response = bot.get_response(query, None, compare=responses)
        print(f"Response: {response}")
        return {"response": response}       
    

if __name__ == "__main__":
    # import uvicorn
    # uvicorn.run(app, host="0.0.0.0", port=8000)

    # post_query({"query": "tell me the ROCE", "company": ["IBM2023"]})
    
    get_metrics()


    # results = get_metrics()

    # # dump in a json file
    # with open("results.json", mode='w') as file:
    #     json.dump(results, file, indent=4)