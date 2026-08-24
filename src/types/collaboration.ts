export type CollaborationStatus = "open" | "looking" | "closed";

export type Collaboration = {
  id: number;
  title: string;
  description: string;
  status: CollaborationStatus;
  expertise: string[];
  researchAreas: string[];
};

export type StatusFilter = "all" | CollaborationStatus;

export type SortOrder = "title-asc" | "title-desc";
