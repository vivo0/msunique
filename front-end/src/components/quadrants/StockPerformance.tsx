import React from "react";
import {
  QuadrantStock,
  FinancialCard,
  GraphPlaceholder,
  QuadrantButton,
  LoadingContainer,
} from "./QuadrantsStyles";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {} from "recharts";
import { Metric } from "../../types";
import { CircularProgress } from "@mui/material";

const CustomXAxis = ({ allowDataOverflow = false, ...props }) => (
  <XAxis allowDataOverflow={allowDataOverflow} {...props} />
);

const CustomYAxis = ({ allowDataOverflow = false, ...props }) => (
  <YAxis allowDataOverflow={allowDataOverflow} {...props} />
);
interface StockPerformanceProps {
  expanded: boolean;
  onExpand: () => void;
  data: (Metric & { values: Array<{ key: string; value: string }> })[];
  allFiltersSelected: boolean;
}

const StockPerformance: React.FC<StockPerformanceProps> = ({
  expanded,
  onExpand,
  data,
  allFiltersSelected,
}) => {
  return (
    <QuadrantStock expanded={expanded}>
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
        <ShowChartIcon />
        Stock Performance
      </h2>
      {!expanded && allFiltersSelected ? (
        <>
          <div
            style={{
              gridColumn: "1 / 2",
              gridRow: "2 / 3",
              height: "18.6em",
            }}
          >
            <GraphPlaceholder>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <CustomXAxis dataKey="name" />
                  <CustomYAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </GraphPlaceholder>
          </div>
          <div
            style={{
              gridColumn: "2 / 3",
              gridRow: "2 / 3",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "10px",
              height: "100%",
            }}
          >
            {data
              .filter((metric) => metric.expanded)
              .map((item) => (
                <FinancialCard expanded={expanded} key={item.title}>
                  <h4 style={{ color: "white", marginBottom: "5px" }}>
                    {item.title}
                  </h4>
                  {item.values.map(({ key, value }) => (
                    <p
                      key={key}
                      style={{
                        color: "#5882be",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {value.toString().toLowerCase().includes("failed")
                        ? "-"
                        : value}
                    </p>
                  ))}
                </FinancialCard>
              ))}
          </div>
        </>
      ) : allFiltersSelected ? (
        data.map((item) => (
          <FinancialCard key={item.title} expanded={expanded}>
            <h4 style={{ color: "white", marginBottom: "5px" }}>
              {item.title}
            </h4>
            {item.values.map(({ key, value }) => (
              <p
                key={key}
                style={{
                  color: "#5882be",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
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
    </QuadrantStock>
  );
};

export default StockPerformance;
