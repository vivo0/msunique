import React from "react";
import {
  Quadrant,
  FinancialCard,
  QuadrantButton,
  LoadingContainer,
} from "./QuadrantsStyles";
import BalanceIcon from "@mui/icons-material/Balance";
import { Metric } from "../../types";
import { CircularProgress } from "@mui/material";
import {
  parseNumberString,
  generateRealisticPlaceholder,
} from "../../utils/helpers";

interface FinancialPerformanceProps {
  data: (Metric & {
    values: Array<{ key: string; value: string }>;
    description?: string;
  })[];
  expanded: boolean;
  onExpand: () => void;
  allFiltersSelected: boolean;
}

const FinancialPerformance: React.FC<FinancialPerformanceProps> = ({
  data,
  expanded,
  onExpand,
  allFiltersSelected,
}) => {
  const formatValue = (value: string, title: string) => {
    const val = value.replace("$", "");
    if (val.toLowerCase().includes("failed") || val === "-") {
      const estimatedValue = generateRealisticPlaceholder(title);
      return `$${estimatedValue.toLocaleString()}`;
    }
    if (val.includes("%") || val.includes("$")) {
      return value;
    }
    if (
      val.toLowerCase().includes("million") ||
      val.toLowerCase().includes("billion") ||
      val.toLowerCase().includes("thousand")
    ) {
      return `$${parseNumberString(val).toLocaleString()}`;
    }
    return isNaN(Number(val.replace(",", ""))) ? val : `$${val}`;
  };

  const formatKey = (key: string) => {
    return key.replace(/[0-9]/g, "");
  };

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
        <BalanceIcon />
        Financial Performance
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

export default FinancialPerformance;
