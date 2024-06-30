export interface Metric {
  title: string;
  expanded: boolean;
  value?: string;
  customSize?: string;
}

interface MetricWithValues extends Metric {
  values: Array<{ key: string; value: string }>;
}

export interface QuadrantProps {
  data: MetricWithValues[];
  expanded: boolean;
  onExpand: () => void;
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
