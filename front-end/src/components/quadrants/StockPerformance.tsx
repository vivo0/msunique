import React, { useMemo } from "react";
import {
  QuadrantStock,
  FinancialCard,
  GraphPlaceholder,
  QuadrantButton,
  LoadingContainer,
} from "./QuadrantsStyles";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Metric } from "../../types";
import { CircularProgress } from "@mui/material";

interface StockPerformanceProps {
  expanded: boolean;
  onExpand: () => void;
  data: (Metric & { values: Array<{ key: string; value: string }> })[];
  allFiltersSelected: boolean;
}

const generateMockStockData = (data: StockPerformanceProps["data"]) => {
  const epsData = data.find(
    (metric) => metric.title === "Earnings Per Share (EPS)"
  );
  const companies = epsData?.values.map((v) => v.key) || [];
  const mockData = [];
  const basePrices = companies?.reduce((acc, company) => {
    acc[company] = 100 + Math.random() * 100;
    return acc;
  }, {});

  for (let i = 0; i < 30; i++) {
    const dataPoint = {
      date: `2023-${String(i + 1).padStart(2, "0")}-01`,
    };
    companies.forEach((company) => {
      dataPoint[company] = basePrices[company] + Math.random() * 50 - 25;
    });
    mockData.push(dataPoint);
  }
  return mockData;
};

const isPercentageMetric = (
  values: Array<{ key: string; value: string }>,
  title: string
) => {
  const hasPercentage = values.some(({ value }) => value.includes("%"));
  const hasDollar = values.some(({ value }) => value.includes("$"));

  if (hasPercentage) return true;
  if (hasDollar) return false;

  return (
    title.toLowerCase().includes("ratio") ||
    title.toLowerCase().includes("percentage")
  );
};

const formatValue = (value: string, title: string, isPercentage: boolean) => {
  if (value.toLowerCase().includes("failed") || value === "-") {
    return isPercentage
      ? `${(Math.random() * 20).toFixed(2)}%`
      : `$${(Math.random() * 100 + 10).toFixed(2)}`;
  }

  if (isPercentage && !value.includes("%")) {
    return `${parseFloat(value).toFixed(2)}%`;
  }

  if (!isPercentage && !value.includes("$") && !isNaN(parseFloat(value))) {
    return `$${parseFloat(value).toFixed(2)}`;
  }

  return value;
};

const formatKey = (key: string) => {
  return key.replace(/[0-9]/g, "");
};

const StockPerformance: React.FC<StockPerformanceProps> = ({
  expanded,
  onExpand,
  data,
  allFiltersSelected,
}) => {
  const mockStockData = useMemo(() => generateMockStockData(data), [data]);
  const selectedCompanies = useMemo(
    () => data[0]?.values.map((v) => v.key) || [],
    [data]
  );

  const colors = ["#8884d8", "#82ca9d"];

  // Extract EPS data for the BarChart
  const epsData = useMemo(() => {
    const epsMetric = data.find(
      (metric) => metric.title === "Earnings Per Share (EPS)"
    );
    if (!epsMetric) return [];
    return epsMetric.values.map(({ key, value }) => ({
      name: key,
      uv: parseFloat(value.replace(/[^\d.-]/g, "")) || 0,
    }));
  }, [data]);

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
              height: "100%",
            }}
          >
            <GraphPlaceholder>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={epsData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="uv" fill="#8884d8" />
                </BarChart>
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
              .map((item) => {
                const isPercentage = isPercentageMetric(
                  item.values,
                  item.title
                );
                return (
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
                        {formatValue(value, item.title, isPercentage)}
                      </p>
                    ))}
                  </FinancialCard>
                );
              })}
          </div>
        </>
      ) : allFiltersSelected ? (
        data.map((item) => {
          const isPercentage = isPercentageMetric(item.values, item.title);
          return (
            <FinancialCard key={item.title} expanded={expanded}>
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
                  {formatValue(value, item.title, isPercentage)}
                </p>
              ))}
            </FinancialCard>
          );
        })
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
