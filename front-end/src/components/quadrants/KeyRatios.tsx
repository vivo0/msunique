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

export default KeyRatios;
