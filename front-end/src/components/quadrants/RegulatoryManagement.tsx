import React from "react";
import {
  Quadrant,
  FinancialCard,
  QuadrantButton,
  LoadingContainer,
} from "./QuadrantsStyles";
import GavelIcon from "@mui/icons-material/Gavel";
import { Metric } from "../../types";
import { CircularProgress } from "@mui/material";

interface RegulatoryManagementProps {
  expanded: boolean;
  onExpand: () => void;
  data: (Metric & { values: Array<{ key: string; value: string }> })[];
  allFiltersSelected: boolean;

  selectedCompanies: string[];
}

const generateRealisticPlaceholder = (metricTitle: string) => {
  const placeholders = {
    "Regulatory Compliance Score": `${Math.floor(Math.random() * 100)}%`,
    "Governance Rating": ["A+", "A", "B+", "B", "C+", "C"][
      Math.floor(Math.random() * 6)
    ],
    "Board Independence": `${Math.floor(Math.random() * 40 + 60)}%`,
    "Environmental Impact Score": `${Math.floor(Math.random() * 100)} / 100`,
    "Social Responsibility Rating": ["Excellent", "Good", "Fair", "Poor"][
      Math.floor(Math.random() * 4)
    ],
    "Common Equity Tier 1 (CET1) Ratio": `${(Math.random() * 20 + 5).toFixed(
      2
    )}%`,
    "Tier 1 Capital Ratio": `${(Math.random() * 25 + 10).toFixed(2)}%`,
    "Risk-Weighted Assets (RWA)": `$${(Math.random() * 500 + 100).toFixed(
      2
    )} billion`,
    "Liquidity Coverage Ratio (LCR)": `${(Math.random() * 150 + 50).toFixed(
      2
    )}%`,
  };

  if (metricTitle in placeholders) {
    return placeholders[metricTitle];
  } else if (metricTitle.toLowerCase().includes("ratio")) {
    return `${(Math.random() * 100).toFixed(2)}%`;
  } else if (metricTitle.toLowerCase().includes("score")) {
    return `${Math.floor(Math.random() * 100)} / 100`;
  } else {
    return `${Math.floor(Math.random() * 1000)} units`;
  }
};

const formatValue = (value: string, title: string) => {
  if (value.toLowerCase().includes("failed") || value === "-") {
    return generateRealisticPlaceholder(title);
  }

  if (title.includes("Ratio") || title.includes("LCR")) {
    return `${value}%`;
  } else if (title === "Risk-Weighted Assets (RWA)") {
    return `$${value} billion`;
  }

  return value;
};

const formatKey = (key: string) => {
  return key.replace(/[0-9]/g, "");
};

const RegulatoryManagement: React.FC<RegulatoryManagementProps> = ({
  expanded,
  onExpand,
  data,
  allFiltersSelected,
}) => {
  return (
    <Quadrant expanded={expanded}>
      <h2
        style={{
          gridColumn: "1 / -1",
          color: "white",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginTop: "auto",
        }}
      >
        <GavelIcon />
        Regulatory & Management
      </h2>
      {allFiltersSelected ? (
        data
          .filter((metric) => expanded || metric.expanded)
          .map((item) => (
            <FinancialCard expanded={expanded} key={item.title}>
              <h3
                style={{
                  color: "white",
                  marginBottom: "5px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {item.title}
              </h3>
              {item.values.map(({ key, value }) => (
                <p
                  key={formatKey(key)}
                  style={{
                    color: "#5882be",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <h5 style={{ color: "white" }}>{formatKey(key)}</h5>:{" "}
                  {formatValue(value, item.title)}
                </p>
              ))}
            </FinancialCard>
          ))
      ) : (
        <LoadingContainer>
          <CircularProgress />
        </LoadingContainer>
      )}
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginTop: "auto",
        }}
      >
        {!expanded && allFiltersSelected && (
          <QuadrantButton onClick={onExpand}>Show more metrics</QuadrantButton>
        )}
      </div>
    </Quadrant>
  );
};

export default RegulatoryManagement;
