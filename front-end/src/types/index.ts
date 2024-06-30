export interface Metric {
  title: string;
  expanded: boolean;
  value?: string;
  customSize?: string;
}

export interface QuadrantProps {
  expanded?: boolean;
}

export interface FilterState {
  sector: string[];
  geographicArea: string[];
  company: string[];
  year: string[];
}

export interface QuadrantState {
  expandedQuadrant: string | null;
  availableQuadrants: string[];
}
