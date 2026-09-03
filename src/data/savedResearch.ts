import type { SavedResearch } from "@/types/research";

export const savedResearch: SavedResearch[] = [
  {
    id: "research-1",
    title:
      "Artificial Intelligence in Clinical Research: Current Applications and Future Directions",
    authors: ["Aarav Sharma", "Meera Patel"],
    journal: "Journal of Biomedical Research",
    publicationDate: "2026-08-28",
    citedByCount: 42,
    doi: null,
    abstract: null,
    researchArea: "Biomedical AI",
    openAccess: true,
    savedAt: "2026-09-01",
  },
  {
    id: "research-2",
    title: "Machine Learning Approaches for Early Disease Detection",
    authors: ["Rohan Mehta", "Sarah Chen", "Daniel Wong"],
    journal: "Nature Biomedical Engineering",
    publicationDate: "2026-08-21",
    citedByCount: 87,
    doi: null,
    abstract: null,
    researchArea: "Machine Learning",
    openAccess: true,
    savedAt: "2026-08-31",
  },
  {
    id: "research-3",
    title: "Patient-Centered Evidence Synthesis Using Large Language Models",
    authors: ["Ananya Kapoor", "James Wilson"],
    journal: "NPJ Digital Medicine",
    publicationDate: "2026-08-15",
    citedByCount: 31,
    doi: null,
    abstract: null,
    researchArea: "Clinical AI",
    openAccess: false,
    savedAt: "2026-08-30",
  },
];
