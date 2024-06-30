export interface Metric {
  title: string;
  expanded: boolean;
  category: string;
}

export const financialPerformanceMetrics: Metric[] = [
  { title: "Net Revenue", expanded: true, category: "Financial Performance" },
  {
    title: "Net Interest Income",
    expanded: true,
    category: "Financial Performance",
  },
  { title: "Net Income", expanded: true, category: "Financial Performance" },
  {
    title: "Operating Expenses",
    expanded: false,
    category: "Financial Performance",
  },
  {
    title: "Non-Interest Income",
    expanded: false,
    category: "Financial Performance",
  },
  {
    title: "Interest Expense",
    expanded: false,
    category: "Financial Performance",
  },
  {
    title: "Provision for Credit Losses",
    expanded: false,
    category: "Financial Performance",
  },
  {
    title: "Salaries and Wages",
    expanded: false,
    category: "Financial Performance",
  },
  {
    title: "General and Administrative Expenses",
    expanded: false,
    category: "Financial Performance",
  },
  {
    title: "Depreciation and Amortization",
    expanded: false,
    category: "Financial Performance",
  },
  {
    title: "Non-Interest Expenses",
    expanded: false,
    category: "Financial Performance",
  },
  {
    title: "Operating Income",
    expanded: false,
    category: "Financial Performance",
  },
  {
    title: "Pre-Tax Income",
    expanded: false,
    category: "Financial Performance",
  },
  {
    title: "Gross Profit Margin",
    expanded: false,
    category: "Financial Performance",
  },
  {
    title:
      "Earnings Before Interest, Taxes, Depreciation, and Amortization (EBITDA)",
    expanded: true,
    category: "Financial Performance",
  },
  {
    title: "Earnings Per Share (EPS)",
    expanded: false,
    category: "Financial Performance",
  },
];

export const stockPerformanceMetrics: Metric[] = [
  {
    title: "Earnings Per Share (EPS)",
    expanded: true,
    category: "Stock Performance",
  },
  {
    title: "Net Profit Margin",
    expanded: false,
    category: "Stock Performance",
  },
  {
    title: "Price to Earnings (P/E) Ratio",
    expanded: true,
    category: "Stock Performance",
  },
  {
    title: "Dividend Payout Ratio",
    expanded: true,
    category: "Stock Performance",
  },
  {
    title: "Price to Book (P/B) Ratio",
    expanded: false,
    category: "Stock Performance",
  },
  { title: "Earnings Yield", expanded: false, category: "Stock Performance" },
  {
    title: "Book Value per Share",
    expanded: false,
    category: "Stock Performance",
  },
  {
    title: "Tangible Book Value per Share",
    expanded: false,
    category: "Stock Performance",
  },
];

export const regulatoryManagementMetrics: Metric[] = [
  {
    title: "Common Equity Tier 1 (CET1) Ratio",
    expanded: true,
    category: "Regulatory Management",
  },
  {
    title: "Tier 1 Capital Ratio",
    expanded: true,
    category: "Regulatory Management",
  },
  {
    title: "Risk-Weighted Assets (RWA)",
    expanded: true,
    category: "Regulatory Management",
  },
  {
    title: "Capital Adequacy Ratio (CAR)",
    expanded: false,
    category: "Regulatory Management",
  },
  {
    title: "Liquidity Coverage Ratio (LCR)",
    expanded: true,
    category: "Regulatory Management",
  },
  {
    title: "Net Stable Funding Ratio (NSFR)",
    expanded: false,
    category: "Regulatory Management",
  },
  {
    title: "Return on Risk-Weighted Assets (RoRWA)",
    expanded: false,
    category: "Regulatory Management",
  },
  {
    title: "Provision Coverage Ratio",
    expanded: false,
    category: "Regulatory Management",
  },
  {
    title: "Allowance for Loan Losses",
    expanded: false,
    category: "Regulatory Management",
  },
];

export const keyRatiosMetrics: Metric[] = [
  { title: "Return on Assets (ROA)", expanded: true, category: "Key Ratios" },
  { title: "Return on Equity (ROE)", expanded: true, category: "Key Ratios" },
  {
    title: "Net Interest Margin (NIM)",
    expanded: true,
    category: "Key Ratios",
  },
  { title: "Efficiency Ratio", expanded: false, category: "Key Ratios" },
  { title: "Cost-to-Income Ratio", expanded: false, category: "Key Ratios" },
  { title: "Debt to Equity Ratio", expanded: true, category: "Key Ratios" },
  { title: "Debt to Assets Ratio", expanded: false, category: "Key Ratios" },
  { title: "Equity Multiplier", expanded: false, category: "Key Ratios" },
  { title: "Asset Turnover Ratio", expanded: false, category: "Key Ratios" },
  {
    title: "Inventory Turnover Ratio",
    expanded: false,
    category: "Key Ratios",
  },
  {
    title: "Operating Efficiency Ratio",
    expanded: false,
    category: "Key Ratios",
  },
  { title: "Interest Coverage Ratio", expanded: false, category: "Key Ratios" },
];
