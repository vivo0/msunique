import React, { useState } from "react";
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

const Dashboard: React.FC = () => {
  const sector = useFilterStore((state) => state.sector);
  const geographicArea = useFilterStore((state) => state.geographicArea);
  const company = useFilterStore((state) => state.company);
  const year = useFilterStore((state) => state.year);
  const updateFilter = useFilterStore((state) => state.updateFilter);
  const resetFilters = useFilterStore((state) => state.resetFilters);

  const { quadrantState, handleQuadrantSelect, handleDeselect } =
    useQuadrantState();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filterState = { sector, geographicArea, company, year };

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
              expanded={
                quadrantState.expandedQuadrant === "Financial Performance"
              }
              onExpand={() => handleQuadrantSelect("Financial Performance")}
            />
            <StockPerformance
              expanded={quadrantState.expandedQuadrant === "Stock Performance"}
              onExpand={() => handleQuadrantSelect("Stock Performance")}
            />
            <RegulatoryManagement
              expanded={
                quadrantState.expandedQuadrant === "Regulatory & Management"
              }
              onExpand={() => handleQuadrantSelect("Regulatory & Management")}
            />
            <KeyRatios
              expanded={quadrantState.expandedQuadrant === "Key Ratios"}
              onExpand={() => handleQuadrantSelect("Key Ratios")}
            />
          </QuadrantSection>
        </ScrollableContent>
      </RightSection>
    </MainContainer>
  );
};

export default Dashboard;
