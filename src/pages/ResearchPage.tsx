import { fetchResearch } from "../api/research";
import { useState, useEffect } from "react";
import type { Research } from "../types/research";
import ResearchCard from "@/components/ResearchCard";
import ResearchSearch from "@/components/ResearchSearch";

function ResearchPage() {
  const [research, setResearch] = useState<Research[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [searchedQuery, setSearchedQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  const suggestions = ["Diabetes", "Immunotherapy", "Cancer", "Biomarkers"];

  async function handleSearch(searchTerm = query) {
    const trimmedQuery = searchTerm.trim();
    if (trimmedQuery === "") {
      return;
    }
    setHasSearched(true);
    setSearchedQuery(trimmedQuery);
    setPage(1);
    setHasMore(true);
    setError(null);
    setIsLoading(true);
    try {
      const data = await fetchResearch(trimmedQuery, 1);
      setResearch(data);
    } catch {
      setError("Failed to fetch research results.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLoadMore() {
    const nextPage = page + 1;
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchResearch(searchedQuery, nextPage);
      setResearch((previous) => [...previous, ...data]);
      setPage(nextPage);
      if (data.length < 10) {
        setHasMore(false);
      }
    } catch (error) {
      setError("Failed to load more research results.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [query]);
  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      return
    }
    console.log("SEARCHING FOR:", debouncedQuery)
  }, [debouncedQuery])

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Research</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Search and discover the latest research papers from across the globe.
        </p>
      </div>

      <ResearchSearch
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        isLoading={isLoading}
        suggestions={suggestions}
        hasSearched={hasSearched}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="space-y-6">
        {!hasSearched ? (
          <div className="mt-10 flex min-h-64 flex-col items-center justify-center rounded-xl border border-border bg-background px-6 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">
              Start your research journey
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Search for topics, authors, or keywords to discover relevant
              research papers and stay updated with the latest scientific
              findings.
            </p>
          </div>
        ) : isLoading ? (
          <p className="text-sm text-muted-foreground">Searching...</p>
        ) : research.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No research papers found.
          </p>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                Search results for "{searchedQuery}"
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {research.length} research papers found
              </p>
            </div>
            {research.map((item) => (
              <ResearchCard key={item.id} research={item} />
            ))}
            {hasMore && (
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Loading..." : "Load more"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ResearchPage;
