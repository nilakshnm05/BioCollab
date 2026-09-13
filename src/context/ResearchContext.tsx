import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Research, SavedResearch } from "@/types/research";
import { savedResearch as initialSavedResearch } from "@/data/savedResearch";

type ResearchContextType = {
  savedResearch: SavedResearch[];
  saveResearch: (research: Research) => void;
  removeSavedResearch: (researchId: string) => void;
  isResearchSaved: (researchId: string) => boolean;
};

const ResearchContext = createContext<ResearchContextType | undefined>(
  undefined,
);

type ResearchProviderProps = {
  children: ReactNode;
};

export function ResearchProvider({ children }: ResearchProviderProps) {
  const [savedResearch, setSavedResearch] =
    useState<SavedResearch[]>(initialSavedResearch);

  function saveResearch(research: Research) {
    setSavedResearch((current) => {
      if (current.some((item) => item.id === research.id)) {
        return current;
      }

      return [
        {
          ...research,
          savedAt: new Date().toISOString(),
        },
        ...current,
      ];
    });
  }

  function removeSavedResearch(researchId: string) {
    setSavedResearch((current) =>
      current.filter((research) => research.id !== researchId),
    );
  }

  function isResearchSaved(researchId: string) {
    return savedResearch.some((research) => research.id === researchId);
  }

  return (
    <ResearchContext.Provider
      value={{
        savedResearch,
        saveResearch,
        removeSavedResearch,
        isResearchSaved,
      }}
    >
      {children}
    </ResearchContext.Provider>
  );
}

export function useResearch() {
  const context = useContext(ResearchContext);

  if (!context) {
    throw new Error("useResearch must be used within ResearchProvider");
  }

  return context;
}