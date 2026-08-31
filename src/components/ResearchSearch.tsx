type ResearchSearchProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: (searchTerm?: string) => void;
  isLoading: boolean;
  suggestions: string[];
  hasSearched: boolean;
};

function ResearchSearch({
  query,
  onQueryChange,
  onSearch,
  isLoading,
  suggestions,
  hasSearched,
}: ResearchSearchProps) {
  return (
    <>
      <div className="flex gap-3 rounded-xl border border-border bg-background p-1.5 shadow-sm">
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search research papers..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          className="flex-1 border-0 bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          onClick={() => onSearch()}
          disabled={isLoading || query.trim() === ""}
          className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      {!hasSearched && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Try searching:</span>

          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                onQueryChange(suggestion);
                onSearch(suggestion);
              }}
              disabled={isLoading}
              className="rounded-full border border-border bg-accent px-3 py-1 text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
export default ResearchSearch;
