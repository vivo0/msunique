import React from "react";
import AutocompleteFilter from "./AutoCompleteFilter";
import {
  FilterWrapper,
  FilterContainer,
  ResetFilterButton,
  ButtonContainer,
  InsightButton,
} from "./FilterStyles";
import {
  sectorOptions,
  geographicAreaOptions,
  companyOptions,
  yearOptions,
  quadrants,
} from "../../constants/options";
import { FilterState } from "../../types";

interface FilterSectionProps {
  filterState: FilterState;
  updateFilter: (key: keyof FilterState, value: string[]) => void;
  resetFilters: () => void;
  handleDeselect: () => void;
  expandedQuadrant: string | null;
  handleQuadrantSelect: (quadrant: string) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filterState,
  updateFilter,
  resetFilters,
  handleDeselect,
  expandedQuadrant,
  handleQuadrantSelect,
}) => {
  return (
    <FilterWrapper>
      <FilterContainer>
        <AutocompleteFilter
          options={sectorOptions}
          value={filterState.sector}
          onChange={(value) => updateFilter("sector", value)}
          placeholder="SECTOR"
        />
        <AutocompleteFilter
          options={geographicAreaOptions}
          value={filterState.geographicArea}
          onChange={(value) => updateFilter("geographicArea", value)}
          placeholder="GEOGRAPHIC AREA"
        />
        <AutocompleteFilter
          options={companyOptions}
          value={filterState.company}
          onChange={(value) => updateFilter("company", value)}
          placeholder="COMPANY"
        />
        <AutocompleteFilter
          options={yearOptions}
          value={filterState.year}
          onChange={(value) => updateFilter("year", value)}
          placeholder="YEAR"
        />
      </FilterContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 0 10px 0",
        }}
      >
        {expandedQuadrant ? (
          <div>
            {quadrants
              .filter((quadrant) => quadrant !== expandedQuadrant)
              .map((quadrant) => (
                <InsightButton
                  key={quadrant}
                  onClick={() => handleQuadrantSelect(quadrant)}
                >
                  {quadrant}
                </InsightButton>
              ))}
          </div>
        ) : (
          <div />
        )}
        <ButtonContainer>
          {expandedQuadrant && (
            <ResetFilterButton onClick={handleDeselect}>
              Show all
            </ResetFilterButton>
          )}
          <ResetFilterButton onClick={resetFilters}>
            Reset filters
          </ResetFilterButton>
        </ButtonContainer>
      </div>
    </FilterWrapper>
  );
};

export default FilterSection;
