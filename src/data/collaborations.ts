import type { Collaboration } from "../types/collaboration";
export const collaborations: Collaboration[] = [
  {
    id: 1,
    title: "AI-Assisted Drug Discovery",
    description:
      "Looking for Members with machine learning and bioinformatics expertise to develop approaches for identifying promising drug candidates.",
    status: "open",
    expertise: ["Machine Learning", "Bioinformatics", "Python"],
    researchAreas: ["Drug Discovery", "Computational Biology"],
    collaborationType: "research-partner",
  },
  {
    id: 2,
    title: "AI Diagnostics for Rare Diseases",
    description:
      "Looking for Members with AI and medical imaging expertise to develop models for earlier detection and classification of rare diseases.",
    status: "looking",
    expertise: ["Deep Learning", "Medical Imaging", "Computer Vision"],
    researchAreas: ["Diagnostics", "Rare Diseases", "Medical AI"],
    collaborationType: "technical-contributor",
  },
  {
    id: 3,
    title: "Genomics Data Analysis",
    description:
      "Collaboration opportunity focused on scalable analysis of genomic datasets and identifying clinically relevant patterns.",
    status: "closed",
    expertise: ["Genomics", "Data Science", "Statistics"],
    researchAreas: ["Genomics", "Precision Medicine", "Bioinformatics"],
    collaborationType: "data-analysis",
  },
];