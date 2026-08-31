import type { Research } from "../types/research";

type OpenAlexWork = {
  id: string;
  title: string;
  publication_date: string;
  cited_by_count: number;
  doi: string | null;
  authorships: {
    author: {
      display_name: string;
    };
  }[];
  primary_location: {
    source: {
      display_name: string;
    } | null;
  };
  open_access: {
    is_oa: boolean;
  };
  primary_topic: {
    display_name: string;
  } | null;
  abstract_inverted_index: Record<string, number[]> | null;
};
type OpenAlexResponse = {
  results: OpenAlexWork[];
};

function reconstructAbstract(
  invertedIndex: Record<string, number[]> | null,
): string | null {
  if (!invertedIndex) {
    return null;
  }
  const words: [number, string][] = [];
  for (const [word, positions] of Object.entries(invertedIndex)) {
    for (const position of positions) {
      words.push([position, word]);
    }
  }
  words.sort((a, b) => {
    return a[0] - b[0];
  });
  return words
    .map(([, word]) => {
      return word;
    })
    .join(" ");
}

function transformResearch(work: OpenAlexWork): Research {
  return {
    id: work.id,
    title: work.title,
    publicationDate: work.publication_date,
    citedByCount: work.cited_by_count,
    doi: work.doi,
    authors: work.authorships.map((authorship) => {
      return authorship.author.display_name;
    }),
    journal: work.primary_location.source?.display_name ?? "Unknown Journal",
    openAccess: work.open_access.is_oa,
    researchArea: work.primary_topic?.display_name ?? "Unknown",
    abstract: reconstructAbstract(work.abstract_inverted_index),
  };
}

export async function fetchResearch(query: string, page: number): Promise<Research[]> {
  const apiKey = import.meta.env.VITE_OPENALEX_API_KEY;
  const encodedQuery = encodeURIComponent(query);
  const response = await fetch(
    `https://api.openalex.org/works?search=${encodedQuery}&per_page=10&page=${page}&api_key=${apiKey}`,
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch research: ${response.status}`);
  }
  const data: OpenAlexResponse = await response.json();
  return data.results.map(transformResearch);
}
