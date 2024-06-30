import React, { useState, useEffect } from "react";
import { useFilterStore } from "../store/useFilterStore";
import { useQuadrantState } from "../hooks/useQuadrantState";
import FilterSection from "../components/filters/FilterSection";
import FinancialPerformance from "../components/quadrants/FinancialPerformance";
import StockPerformance from "../components/quadrants/StockPerformance";
import RegulatoryManagement from "../components/quadrants/RegulatoryManagement";
import KeyRatios from "../components/quadrants/KeyRatios";
import SidebarMenu from "../components/sidebarmenu/SidebarMenu";
import ReactMarkdown from "react-markdown";
import { QuadrantSection } from "../components/quadrants/QuadrantsStyles";
import {
  MainContainer,
  LeftSection,
  SidebarContainer,
  ContentContainer,
  RightSection,
  ScrollableContent,
  ContentHeader,
  ScoreSection,
} from "../styles/DashboardStyles";
import axios from "axios";
import {
  financialPerformanceMetrics,
  keyRatiosMetrics,
  regulatoryManagementMetrics,
  stockPerformanceMetrics,
} from "../constants/metrics";
import Markdown from "react-markdown";

interface CompanyInfo {
  name: string;
  description: string;
  score: number;
}

const Dashboard: React.FC = () => {
  const concatenatedArray = useFilterStore((state) => state.concatenatedArray);
  const sector = useFilterStore((state) => state.sector);
  const geographicArea = useFilterStore((state) => state.geographicArea);
  const company = useFilterStore((state) => state.company);
  const year = useFilterStore((state) => state.year);
  const updateFilter = useFilterStore((state) => state.updateFilter);
  const resetFilters = useFilterStore((state) => state.resetFilters);

  const { quadrantState, handleQuadrantSelect, handleDeselect } =
    useQuadrantState() || {};

  interface MetricsData {
    [key: string]: {
      [metricTitle: string]: string;
    };
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [allFiltersSelected, setAllFiltersSelected] = useState<boolean>(false);
  const [companiesInfo, setCompaniesInfo] = useState<CompanyInfo[]>([]);

  const filterState = { sector, geographicArea, company, year };
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const getMetricValues = (
    metricsArray: typeof financialPerformanceMetrics
  ) => {
    if (!metrics || concatenatedArray.length === 0) return [];

    const companyDescriptions: { [key: string]: string } = {};

    concatenatedArray.forEach((key) => {
      const companyName = key.replace(/\d+$/, "");
      if (
        metrics[key] &&
        metrics[key].response &&
        !companyDescriptions[companyName]
      ) {
        companyDescriptions[companyName] = metrics[key].description;
      }
    });

    return metricsArray.map((metric) => ({
      ...metric,
      values: concatenatedArray.map((key) => ({
        key,
        value: metrics[key]?.[metric.title] || "-",
      })),
      description: companyDescriptions[company[0].replace(/\d+$/, "")] || "",
    }));
  };

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const storedMetrics = localStorage.getItem("metrics");
        if (storedMetrics) {
          setMetrics(JSON.parse(storedMetrics));
        } else {
          const response = await axios.get(`${API_URL}/get-metrics`);
          setMetrics(response.data);
          localStorage.setItem("metrics", JSON.stringify(response.data));
        }
      } catch (err) {
        console.error("Error fetching metrics:", err);
      }
    };

    fetchMetrics();
  }, []);

  useEffect(() => {
    const areAllFiltersSelected =
      sector.length > 0 &&
      geographicArea.length > 0 &&
      company.length > 0 &&
      year.length > 0;
    setAllFiltersSelected(areAllFiltersSelected);
  }, [sector, geographicArea, company, year]);

  useEffect(() => {
    if (metrics && company.length > 0) {
      const newCompaniesInfo = company
        .slice(0, 2)
        .map((companyName) => {
          const companyKey = Object.keys(metrics).find((key) =>
            key.startsWith(companyName)
          );
          if (companyKey) {
            return {
              name: companyName,
              description: metrics[companyKey].response || "",
              score: calculateScore(metrics[companyKey]),
            };
          }
          return null;
        })
        .filter(Boolean) as CompanyInfo[];

      setCompaniesInfo(newCompaniesInfo);
    }
  }, [metrics, company]);

  const calculateScore = (companyMetrics: any): number => {
    return Math.floor(Math.random() * 10);
  };

  return (
    <MainContainer>
      <LeftSection isOpen={sidebarOpen}>
        <SidebarContainer>
          <SidebarMenu onToggle={setSidebarOpen} />
          <ContentContainer isOpen={sidebarOpen}>
            {companiesInfo.map((companyInfo, index) => (
              <div key={companyInfo.name}>
                <ContentHeader>
                  <h2>{companyInfo.name}</h2>
                  <ScoreSection score={companyInfo.score}>
                    {companyInfo.score}
                  </ScoreSection>
                </ContentHeader>
                <p
                  style={{
                    marginLeft: "20px",
                    marginBottom: index === 0 ? "20px" : "0",
                  }}
                >
                  <Markdown>{companyInfo.description}</Markdown>
                </p>
              </div>
            ))}
          </ContentContainer>
        </SidebarContainer>
      </LeftSection>
      <RightSection isLeftOpen={sidebarOpen}>
        <FilterSection
          filterState={filterState}
          updateFilter={updateFilter}
          resetFilters={resetFilters}
          handleDeselect={handleDeselect}
          expandedQuadrant={quadrantState.expandedQuadrant}
          handleQuadrantSelect={handleQuadrantSelect}
        />
        <ScrollableContent>
          <QuadrantSection>
            <FinancialPerformance
              data={getMetricValues(financialPerformanceMetrics)}
              expanded={
                quadrantState.expandedQuadrant === "Financial Performance"
              }
              onExpand={() => handleQuadrantSelect("Financial Performance")}
              allFiltersSelected={allFiltersSelected}
            />
            <StockPerformance
              data={getMetricValues(stockPerformanceMetrics)}
              expanded={quadrantState.expandedQuadrant === "Stock Performance"}
              onExpand={() => handleQuadrantSelect("Stock Performance")}
              allFiltersSelected={allFiltersSelected}
            />
            <RegulatoryManagement
              data={getMetricValues(regulatoryManagementMetrics)}
              expanded={
                quadrantState.expandedQuadrant === "Regulatory & Management"
              }
              onExpand={() => handleQuadrantSelect("Regulatory & Management")}
              allFiltersSelected={allFiltersSelected}
              selectedCompanies={concatenatedArray.map((key) =>
                key.replace(/\d+$/, "")
              )}
            />
            <KeyRatios
              data={getMetricValues(keyRatiosMetrics)}
              expanded={quadrantState.expandedQuadrant === "Key Ratios"}
              onExpand={() => handleQuadrantSelect("Key Ratios")}
              allFiltersSelected={allFiltersSelected}
            />
          </QuadrantSection>
        </ScrollableContent>
      </RightSection>
    </MainContainer>
  );
};

export default Dashboard;
