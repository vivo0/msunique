import React from "react";
import { Quadrant, FinancialCard, QuadrantButton } from "./QuadrantsStyles";
import { regulatoryManagementMetrics } from "../../constants/metrics";
import GavelIcon from "@mui/icons-material/Gavel";

interface RegulatoryManagementProps {
  expanded: boolean;
  onExpand: () => void;
}

const RegulatoryManagement: React.FC<RegulatoryManagementProps> = ({
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
        <GavelIcon />
        Regulatory & Management
      </h2>
      {regulatoryManagementMetrics
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

export default RegulatoryManagement;
