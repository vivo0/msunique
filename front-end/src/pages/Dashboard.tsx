import React, { useState, useEffect } from "react";
import { useFilterStore } from "../store/useFilterStore";
import { useQuadrantState } from "../hooks/useQuadrantState";
import FilterSection from "../components/filters/FilterSection";
import FinancialPerformance from "../components/quadrants/FinancialPerformance";
import StockPerformance from "../components/quadrants/StockPerformance";
import RegulatoryManagement from "../components/quadrants/RegulatoryManagement";
import KeyRatios from "../components/quadrants/KeyRatios";
import SidebarMenu from "../components/sidebarmenu/SidebarMenu";
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
  const [allFiltersSelected, setAllFiltersSelected] = useState(false);
  const filterState = { sector, geographicArea, company, year };
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  const getMetricValues = (
    metricsArray: typeof financialPerformanceMetrics
  ) => {
    if (!metrics || concatenatedArray.length === 0) return [];

    return metricsArray.map((metric) => ({
      ...metric,
      values: concatenatedArray.map((key) => ({
        key,
        value: metrics[key]?.[metric.title] || "-",
      })),
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

  return (
    <MainContainer>
      <LeftSection isOpen={sidebarOpen}>
        <SidebarContainer>
          <SidebarMenu onToggle={setSidebarOpen} />
          <ContentContainer isOpen={sidebarOpen}>
            <ContentHeader>
              <h2>{company.join(", ")}</h2>
              <ScoreSection score={10}>10</ScoreSection>
            </ContentHeader>
            <p style={{ marginLeft: "20px" }}>
              UBS Group AG is a leading global financial services company.
            </p>
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
