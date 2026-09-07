import { fetchResearch } from "../api/research";
import { useState } from "react";
import ResearchCard from "@/components/ResearchCard";
import ResearchSearch from "@/components/ResearchSearch";
import { useInfiniteQuery } from "@tanstack/react-query";

function ResearchPage() {
  const [query, setQuery] = useState<string>("");
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [searchedQuery, setSearchedQuery] = useState<string>("");

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["research", searchedQuery],
    queryFn: ({ pageParam }) => fetchResearch(searchedQuery, pageParam),
    enabled: searchedQuery.trim() !== "",
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
  const research = data?.pages.flat() ?? [];

  const suggestions = ["Diabetes", "Immunotherapy", "Cancer", "Biomarkers"];

  function handleSearch(searchTerm = query) {
    const trimmedQuery = searchTerm.trim();
    if (trimmedQuery === "") {
      return;
    }
    setHasSearched(true);
    setSearchedQuery(trimmedQuery);
  }

  async function handleLoadMore() {
    await fetchNextPage();
  }

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

      {error && <p className="text-sm text-destructive">{error.message}</p>}

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
            {hasNextPage && (
              <button
                onClick={handleLoadMore}
                disabled={isFetchingNextPage}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ResearchPage;
