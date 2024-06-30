import React from "react";
import { Quadrant, FinancialCard, QuadrantButton } from "./QuadrantsStyles";
import { keyRatios } from "../../constants/metrics";
import PercentIcon from "@mui/icons-material/Percent";

interface KeyRatiosProps {
  expanded: boolean;
  onExpand: () => void;
}

const KeyRatios: React.FC<KeyRatiosProps> = ({ expanded, onExpand }) => {
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
      {keyRatios
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

export default KeyRatios;
