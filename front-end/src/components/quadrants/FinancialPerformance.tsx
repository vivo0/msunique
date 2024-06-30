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
                  <h5 style={{ color: "white" }}>{formatKey(key)}</h5>: {value}
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
