import { useState } from "react";
import { QuadrantState } from "../types";
import { quadrants } from "../constants/options";

export const useQuadrantState = () => {
  const [quadrantState, setQuadrantState] = useState<QuadrantState>({
    expandedQuadrant: null,
    availableQuadrants: quadrants,
  });

  const handleQuadrantSelect = (selectedQuadrant: string) => {
    setQuadrantState(() => ({
      expandedQuadrant: selectedQuadrant,
      availableQuadrants: quadrants.filter((q) => q !== selectedQuadrant),
    }));
  };

  const handleDeselect = () => {
    setQuadrantState({
      expandedQuadrant: null,
      availableQuadrants: quadrants,
    });
  };

  return { quadrantState, handleQuadrantSelect, handleDeselect };
};
