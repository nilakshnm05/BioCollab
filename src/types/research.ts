export type Research = {
  id: string;
  title: string;
  authors: string[];
  journal: string ;
  publicationDate: string;
  citedByCount: number;
  doi: string | null;
  abstract: string | null;
  researchArea: string | null;
  openAccess: boolean;
};
