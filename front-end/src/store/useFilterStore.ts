import create from "zustand";
import { FilterState } from "../types";

interface FilterStore extends FilterState {
  concatenatedArray: string[];
  updateFilter: (key: keyof FilterState, value: string[]) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  sector: ["Banking"],
  geographicArea: ["Europe"],
  company: ["UBS"],
  year: ["2023"],
  concatenatedArray: ["UBS2023"],

  updateFilter: (key, value) => {
    set((state) => {
      const newState = { ...state, [key]: value };
      const newConcatenatedArray = newState.company.flatMap((comp) =>
        newState.year.map((yr) => `${comp}${yr}`)
      );
      return { ...newState, concatenatedArray: newConcatenatedArray };
    });
  },

  resetFilters: () => {
    set(() => ({
      sector: [],
      geographicArea: [],
      company: [],
      year: [],
      concatenatedArray: [],
    }));
  },
}));
