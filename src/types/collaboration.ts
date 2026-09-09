export type CollaborationStatus = "open" | "looking" | "closed";

export type CollaborationType =
  | "research-partner"
  | "technical-contributor"
  | "data-analysis"
  | "other";
  
export type Collaboration = {
  id: number;
  title: string;
  description: string;
  status: CollaborationStatus;
  expertise: string[];
  researchAreas: string[];
  collaborationType: CollaborationType;
};

export type StatusFilter = "all" | CollaborationStatus;

export type SortOrder = "title-asc" | "title-desc";
