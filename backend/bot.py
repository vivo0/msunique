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

load_dotenv()
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
        
        # query = "cash flows from operating activities"
        # docs = self.vectorstore.similarity_search(query)
        # print(docs)
        # print(rag_chain.invoke(metric))
        return rag_chain.invoke(metric)
    
    def get_response(self, query, namespace, compare=False):
        llm = ChatOpenAI(temperature=0,model_name=self.model_name)
        # qa = RetrievalQA.from_chain_type(
        #     llm=llm,
        #     chain_type="stuff",
        #     retriever=self.vectorstore.as_retriever()
        # )
        if compare:
            template = """Context:
You are tasked with analyzing companies' financial statements to evaluate their investment potential based on Warren Buffett's principles. Focus on understanding and interpreting the income statement, balance sheet, and cash flow statement to assess consistency, profitability, capital efficiency, debt levels, cash flow, and competitive advantage.

Objectives:

Assess the consistency of earnings, revenue, and profitability over the last 10 years.
Compare gross and net margins to industry standards and competitors.
Evaluate return on equity and the use of retained earnings.
Determine the company's debt levels and its ability to cover debt with earnings.
Analyze capital expenditures, free cash flow, and payout ratios.
Identify the durability and market position of key products/services for a sustainable competitive advantage.
Structure:

Income Statement Analysis:

Track trends in net earnings and revenue over the last 10 years.
Compare gross margin with industry standards, targeting 40%+.
Calculate net margin and compare to competitors, targeting 20%+.
Balance Sheet Analysis:

Evaluate the trend in retained earnings growth.
Compare ROE to industry peers.
Assess the debt-to-equity ratio and the company's ability to cover long-term debt with earnings.
Cash Flow Statement Analysis:

Determine the percentage of CapEx relative to net earnings, targeting <25%.
Analyze trends in free cash flow.
Evaluate the payout ratio, including dividends and share buybacks.
Trends:

Identify trends in revenue, earnings, margins, ROE, and free cash flow over the last 10 years.
Compare the company's performance metrics with key competitors and industry averages.
Assess the durability and market share of the company's key products or services over time.
Actions:

Gather financial data for the companies being analyzed, including income statements, balance sheets, and cash flow statements for the last 10 years.
Compute relevant metrics such as gross margin, net margin, ROE, CapEx percentage, and payout ratio.
Compare the calculated metrics against industry standards and competitors.
Identify and analyze trends in the company's financial performance.
Evaluate the sustainability of the company's competitive advantage based on product durability, market position, and scalability.
Results:

Generate a comprehensive report summarizing the analysis, including comparisons, trend insights, and overall assessment.
Provide a recommendation on whether the company aligns with Warren Buffett's investment criteria and is a good investment prospect.
Suggest a plan for ongoing monitoring of the company's performance to ensure it continues to meet the investment criteria.

Here is the context: {compare}.

Please provide a response to the following question: {query}.

"""
            prompt = ChatPromptTemplate.from_template(template)
            compare = "first company: ", compare[0], "second company: ", compare[1]
            rag_chain = (
                {"compare": RunnablePassthrough(), "query": RunnablePassthrough()}
                | prompt
                | llm
                | StrOutputParser()
            )
            return rag_chain.invoke({"compare": compare, "query": query})
        
        template = """Context:
You are an expert financial analyst employed by Warren Buffett, responsible for providing precise financial data and analyses upon request. Your job is to retrieve, understand, and perfectly present the data without making mistakes or inventing information. Your goal is to ensure that the financial data is accurate, relevant, and effectively communicated. Note: You are never to calculate data yourself, only use data that is directly retrieved from reliable sources.

Objectives:

Retrieve Accurate Data: Ensure all financial data is current, accurate, and from reliable sources.
Understand Financial Statements: Have a deep understanding of income statements, balance sheets, and cash flow statements.
Present Data Clearly: Present data in a clear, concise, and comprehensive manner suitable for decision-making.
Analyze Consistency: Provide analysis on the consistency of earnings, revenue, and profitability.
Compare Profitability: Compare profitability metrics (gross margin, net margin) to industry standards and competitors.
Evaluate Capital Efficiency: Assess metrics like return on equity (ROE) and retained earnings growth.
Assess Debt Levels: Evaluate the company’s debt levels and its ability to cover long-term debt.
Analyze Cash Flow: Analyze capital expenditures, free cash flow, and payout ratios.
Identify Competitive Advantage: Highlight indicators of a sustainable competitive advantage.
Structure:

Data Retrieval:

Ensure data is sourced from reliable, up-to-date financial databases or company reports.
Cross-verify data to ensure accuracy.
Do not calculate data; only use the data as it is retrieved.
Financial Statement Analysis:

Income Statement: Track and present trends in net earnings and revenue over the last 10 years using retrieved data.

Gross Margin: Use retrieved gross margins and compare with industry standards, targeting 40%+.

Net Margin: Use retrieved net margins and compare to competitors, targeting 20%+.

Balance Sheet:

Track retained earnings growth over the last 10 years using retrieved data.
Use retrieved ROE and compare to industry peers.
Assess the debt-to-equity ratio and the company's ability to cover long-term debt with earnings using retrieved data.
Cash Flow Statement:

Use retrieved capital expenditures as a percentage of net earnings, targeting <25%.
Analyze trends in free cash flow using retrieved data.
Evaluate the payout ratio, including dividends and share buybacks using retrieved data.
Trends Analysis:

Identify and analyze trends in revenue, earnings, margins, ROE, and free cash flow over the last 10 years using retrieved data.
Compare the company's performance metrics with key competitors and industry averages using retrieved data.
Assess the durability and market share of the company's key products or services over time using retrieved data.
Actions:

Gather Data:

Retrieve the most recent and historical financial data for the companies being analyzed, including income statements, balance sheets, and cash flow statements for the last 10 years.
Data Usage:

Use relevant financial metrics such as gross margin, net margin, ROE, CapEx percentage, and payout ratio directly from the retrieved data.
Analyze and Compare:

Compare the retrieved metrics against industry standards and competitors.
Identify and analyze trends in the company’s financial performance using retrieved data.
Evaluate the sustainability of the company's competitive advantage based on product durability, market position, and scalability using retrieved data.
Present Data:

Generate a comprehensive report summarizing the analysis, including comparisons, trend insights, and overall assessment using retrieved data.
Provide a clear and concise presentation of the data, ensuring it is suitable for decision-making.
Results:

Comprehensive Report:

Produce a detailed report with accurate financial data, comparisons, trend analyses, and insights into the company’s financial health and competitive advantage using retrieved data.
Investment Recommendation:

Based on the analysis using retrieved data, provide a recommendation on whether the company aligns with Warren Buffett’s investment criteria and is a good investment prospect.
Ongoing Monitoring Plan:

Suggest a plan for ongoing monitoring of the company’s performance to ensure it continues to meet investment criteria using retrieved data.

Here is the context: {context}.

Please provide a response to the following question: {query}.

"""

        prompt = ChatPromptTemplate.from_template(template)

        rag_chain = (
            {"context": self.vectorstore.as_retriever(include_metadata=True, search_kwargs={"k": 3, 'filter': {'namespace': namespace}}), "query": RunnablePassthrough()}
            | prompt
            | llm
            | StrOutputParser()
        )

        return rag_chain.invoke(query)


if __name__ == "__main__":
    os.environ["PINECONE_API_KEY"] = os.getenv("PINECONE_API_KEY")
    embedder = OpenAIEmbeddings(model="text-embedding-ada-002")
    vectorstore = PineconeVectorStore.from_existing_index("swisshackaton", embedder)
    bot = Bot(vectorstore)
    bot.get_metric("EPS 2021", "IBM2022")


            
