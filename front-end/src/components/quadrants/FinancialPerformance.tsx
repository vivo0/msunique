import React from "react";
import { Quadrant, FinancialCard, QuadrantButton } from "./QuadrantsStyles";
import { financialPerformanceMetrics } from "../../constants/metrics";
import BalanceIcon from "@mui/icons-material/Balance";

interface FinancialPerformanceProps {
  expanded: boolean;
  onExpand: () => void;
}

const FinancialPerformance: React.FC<FinancialPerformanceProps> = ({
  expanded,
  onExpand,
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
        <BalanceIcon />
        Financial Performance
      </h2>
      {financialPerformanceMetrics
        .filter((metric) => expanded || metric.expanded)
        .map((item) => (
          <FinancialCard expanded={expanded} key={item.title}>
            <h4 style={{ color: "white", marginBottom: "5px" }}>
              {item.title}
            </h4>
          </FinancialCard>
        ))}
      <div
        style={{
          gridColumn: "1 / -1",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginTop: "auto",
        }}
      >
        {!expanded && (
          <QuadrantButton onClick={onExpand}>Show more metrics</QuadrantButton>
        )}
      </div>
    </Quadrant>
  );
};

export default FinancialPerformance;
