import { Link } from "react-router-dom";
import { useResearch } from "@/context/ResearchContext";

function ResearchView() {
  const { savedResearch, removeSavedResearch } = useResearch();

  const savedResearchCount = savedResearch.length;

  return (
    <div className="space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-semibold">Research</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage and revisit research relevant to your work.
        </p>
      </header>

      <section className="space-y-3">
        <h2>Summary</h2>

        <div className="grid sm:grid-cols-1">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">Saved Research</p>

            <p className="mt-2 text-3xl font-semibold">{savedResearchCount}</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2>Saved Research</h2>

        {savedResearch.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No saved research yet.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {savedResearch.map((research) => (
              <article
                key={research.id}
                className="rounded-lg border border-border bg-background p-4"
              >
                <h3 className="font-medium">{research.title}</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {research.authors.join(", ")}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {research.journal} · {research.publicationDate.slice(0, 4)}
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  {research.researchArea} · {research.citedByCount} citations
                </p>

                <button
                  type="button"
                  onClick={() => removeSavedResearch(research.id)}
                  className="mt-3 text-sm font-medium text-destructive hover:underline"
                >
                  Remove from Workspace
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2>Discover</h2>

        <div className="rounded-lg border border-border bg-background p-4">
          <p className="font-medium">Explore new research</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Search and discover research papers relevant to your interests.
          </p>

          <Link
            to="/research"
            className="mt-3 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Explore Research
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ResearchView;
