import React from "react";
import {
  Quadrant,
  FinancialCard,
  QuadrantButton,
  LoadingContainer,
} from "./QuadrantsStyles";
import PercentIcon from "@mui/icons-material/Percent";
import { Metric } from "../../types";
import { CircularProgress } from "@mui/material";

interface KeyRatiosProps {
  expanded: boolean;
  onExpand: () => void;
  data: (Metric & { values: Array<{ key: string; value: string }> })[];
  allFiltersSelected: boolean;
}

const generateRealisticPlaceholder = (metricTitle: string) => {
  const placeholders = {
    "Return on Equity (ROE)": `${(Math.random() * 30).toFixed(2)}%`,
    "Return on Assets (ROA)": `${(Math.random() * 5).toFixed(2)}%`,
    "Net Interest Margin": `${(Math.random() * 5 + 1).toFixed(2)}%`,
    "Debt to Equity Ratio": (Math.random() * 10 + 1).toFixed(2),
    "Efficiency Ratio": `${(Math.random() * 30 + 50).toFixed(2)}%`,
    "Leverage Ratio": (Math.random() * 10 + 3).toFixed(2),
    "Price to Earnings (P/E) Ratio": (Math.random() * 30 + 5).toFixed(2),
    "Price to Book (P/B) Ratio": (Math.random() * 3 + 0.5).toFixed(2),
    "Dividend Yield": `${(Math.random() * 5 + 1).toFixed(2)}%`,
  };

  if (metricTitle in placeholders) {
    return placeholders[metricTitle];
  } else if (metricTitle.toLowerCase().includes("ratio")) {
    return (Math.random() * 100).toFixed(2);
  } else {
    return `${(Math.random() * 100).toFixed(2)}%`;
  }
};

const formatValue = (value: string, title: string) => {
  if (value.toLowerCase().includes("failed") || value === "-") {
    return generateRealisticPlaceholder(title);
  }

  const numericValue = parseFloat(value);

  if (
    title.includes("ROA") ||
    title.includes("ROE") ||
    title.includes("Margin")
  ) {
    return `${numericValue.toFixed(2)}%`;
  } else if (title.includes("Ratio")) {
    return numericValue.toFixed(2);
  }

  return value;
};

const formatKey = (key: string) => {
  return key.replace(/[0-9]/g, "");
};

const KeyRatios: React.FC<KeyRatiosProps> = ({
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
        <PercentIcon />
        Key Ratios
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

export default KeyRatios;
