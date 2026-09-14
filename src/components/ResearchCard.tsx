import { Research } from "@/types/research";
import { useResearch } from "@/context/ResearchContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

type ResearchCardProps = {
  research: Research;
};

function ResearchCard({ research }: ResearchCardProps) {
  const {
    saveResearch,
    removeSavedResearch,
    isResearchSaved,
    setPendingUnauthResearch,
  } = useResearch();

  const saved = isResearchSaved(research.id);

  const sourceUrl = research.doi
    ? research.doi.startsWith("http")
      ? research.doi
      : `https://doi.org/${research.doi}`
    : null;

  const { isAuthenticated } = useAuth();

  const navigate = useNavigate();

  return (
    <article className="mt-10 rounded-xl border border-border bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
      <header>
        {research.researchArea && (
          <span className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">
            {research.researchArea}
          </span>
        )}
        <h2 className="mb-2 text-xl font-bold text-foreground">
          {research.title}
        </h2>
        <div className="flex flex-wrap">
          {research.authors.map((author, index) => (
            <span key={author} className="text-sm text-muted-foreground">
              {index > 0 && " · "}
              {author}&nbsp;
            </span>
          ))}
        </div>
      </header>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <p>{research.journal}</p>
        <p>{research.publicationDate}</p>
        <p>Citations: {research.citedByCount}</p>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-foreground/70">
        <p className="mb-2 text-sm font-medium text-foreground">Abstract</p>
        <p className="line-clamp-3">
          {research.abstract || "No abstract available for this paper."}
        </p>
      </div>
      <footer className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <div className="flex items-center gap-3">
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Paper
            </a>
          )}

          <button
            type="button"
            onClick={() => {
              if (saved) {
                removeSavedResearch(research.id);
                return;
              }
              if (!isAuthenticated) {
                setPendingUnauthResearch(research);
                navigate("/login");
                return;
              }
              saveResearch(research);
            }}
            className="rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            {saved ? "Saved" : "Save to Workspace"}
          </button>
        </div>

        {research.openAccess && (
          <span className="rounded-full bg-accent px-3 py-1 text-sm text-primary">
            Open Access
          </span>
        )}
      </footer>
    </article>
  );
}
export default ResearchCard;
