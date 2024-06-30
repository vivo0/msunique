import React from "react";
import {
  QuadrantStock,
  FinancialCard,
  GraphPlaceholder,
  QuadrantButton,
} from "./QuadrantsStyles";
import { stockPerformanceMetrics } from "../../constants/metrics";
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

interface StockPerformanceProps {
  expanded: boolean;
  onExpand: () => void;
}

const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

const CustomXAxis = ({ allowDataOverflow = false, ...props }) => (
  <XAxis allowDataOverflow={allowDataOverflow} {...props} />
);

const CustomYAxis = ({ allowDataOverflow = false, ...props }) => (
  <YAxis allowDataOverflow={allowDataOverflow} {...props} />
);

const StockPerformance: React.FC<StockPerformanceProps> = ({
  expanded,
  onExpand,
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
      {!expanded ? (
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
            {stockPerformanceMetrics
              .filter((metric) => metric.expanded)
              .map((item) => (
                <FinancialCard expanded={expanded} key={item.title}>
                  <h4 style={{ color: "white", marginBottom: "5px" }}>
                    {item.title}
                  </h4>
                  <p
                    style={{
                      color: "#5882be",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.value}
                  </p>
                </FinancialCard>
              ))}
          </div>
        </>
      ) : (
        stockPerformanceMetrics.map((item) => (
          <FinancialCard key={item.title} expanded={expanded}>
            <h4 style={{ color: "white", marginBottom: "5px" }}>
              {item.title}
            </h4>
            <p
              style={{
                color: "#5882be",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {item.value}
            </p>
          </FinancialCard>
        ))
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
        {!expanded && (
          <QuadrantButton onClick={onExpand}>Show more metrics</QuadrantButton>
        )}
      </div>
    </QuadrantStock>
  );
};

export default StockPerformance;
