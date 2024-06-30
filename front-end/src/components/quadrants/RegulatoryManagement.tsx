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
}

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
              <h4 style={{ color: "white", marginBottom: "5px" }}>
                {item.title}
              </h4>
              {item.values.map(({ key, value }) => (
                <p key={key} style={{ color: "#5882be" }}>
                  {value.toString().toLowerCase().includes("failed")
                    ? "-"
                    : value}
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
