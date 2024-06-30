import { Metric } from "../types";

export const financialPerformanceMetrics: Metric[] = [
  { title: "Net Revenue", expanded: true },
  { title: "Net Interest Income", expanded: true },
  { title: "Net Income", expanded: true },
  { title: "Operating Expenses", expanded: false },
  { title: "Non-Interest Income", expanded: false },
  { title: "Interest Expense", expanded: false },
  { title: "Provision for Credit Losses", expanded: false },
  { title: "Salaries and Wages", expanded: false },
  { title: "General and Administrative Expenses", expanded: false },
  { title: "Depreciation and Amortization", expanded: false },
  { title: "Non-Interest Expenses", expanded: false },
  { title: "Operating Income", expanded: false },
  { title: "Pre-Tax Income", expanded: false },
  { title: "Gross Profit Margin", expanded: false },
  {
    title:
      "Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA)",
    expanded: true,
  },
  { title: "Earnings Per Share (EPS)", expanded: false },
];

export const stockPerformanceMetrics: Metric[] = [
  { title: "Earnings Per Share (EPS)", expanded: true },
  { title: "Net Profit Margin", expanded: false },
  { title: "Price to Earnings (P/E) Ratio", expanded: true },
  { title: "Dividend Payout Ratio", expanded: true },
  { title: "Price to Book (P/B) Ratio", expanded: false },
  { title: "Earnings Yield", expanded: false },
  { title: "Book Value per Share", expanded: false },
  { title: "Tangible Book Value per Share", expanded: false },
];

export const regulatoryManagementMetrics: Metric[] = [
  { title: "Common Equity Tier 1 (CET1) Ratio", expanded: true },
  { title: "Tier 1 Capital Ratio", expanded: true },
  { title: "Risk-Weighted Assets (RWA)", expanded: true },
  { title: "Capital Adequacy Ratio (CAR)", expanded: false },
  { title: "Liquidity Coverage Ratio (LCR)", expanded: true },
  { title: "Net Stable Funding Ratio (NSFR)", expanded: false },
  { title: "Return on Risk-Weighted Assets (RoRWA)", expanded: false },
  { title: "Provision Coverage Ratio", expanded: false },
  { title: "Allowance for Loan Losses", expanded: false },
];

export const keyRatios: Metric[] = [
  { title: "Return on Assets (ROA)", expanded: true },
  { title: "Return on Equity (ROE)", expanded: true },
  { title: "Net Interest Margin (NIM)", expanded: true },
  { title: "Efficiency Ratio", expanded: false },
  { title: "Cost-to-Income Ratio", expanded: false },
  { title: "Debt to Equity Ratio", expanded: true },
  { title: "Debt to Assets Ratio", expanded: false },
  { title: "Equity Multiplier", expanded: false },
  { title: "Asset Turnover Ratio", expanded: false },
  { title: "Inventory Turnover Ratio", expanded: false },
  { title: "Operating Efficiency Ratio", expanded: false },
  { title: "Interest Coverage Ratio", expanded: false },
];
