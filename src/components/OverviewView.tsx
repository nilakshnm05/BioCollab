import type { Research } from "@/types/research";
import type { WorkspaceView } from "@/types/workspace";

type OverviewViewProps = {
  setActiveView: (view: WorkspaceView) => void;
};

const summary = {
  activeCollaborations: 4,
  savedResearch: 12,
  pendingActions: 3,
};
const recentResearch: Research[] = [
  {
    id: "research-1",
    title:
      "Artificial Intelligence in Clinical Research: Current Applications and Future Directions",
    authors: ["Aarav Sharma", "Meera Patel"],
    journal: "Journal of Biomedical Research",
    publicationDate: "2026-08-28",
    citedByCount: 42,
    doi: null,
    abstract: null,
    researchArea: "Biomedical AI",
    openAccess: true,
  },
  {
    id: "research-2",
    title: "Machine Learning Approaches for Early Disease Detection",
    authors: ["Rohan Mehta", "Sarah Chen", "Daniel Wong"],
    journal: "Nature Biomedical Engineering",
    publicationDate: "2026-08-21",
    citedByCount: 87,
    doi: null,
    abstract: null,
    researchArea: "Machine Learning",
    openAccess: true,
  },
  {
    id: "research-3",
    title: "Patient-Centered Evidence Synthesis Using Large Language Models",
    authors: ["Ananya Kapoor", "James Wilson"],
    journal: "NPJ Digital Medicine",
    publicationDate: "2026-08-15",
    citedByCount: 31,
    doi: null,
    abstract: null,
    researchArea: "Clinical AI",
    openAccess: false,
  },
];
const collaborationActivity = [
  {
    id: "collab-1",
    text: "Dr. Mehta accepted your collaboration request",
    time: "2 hours ago",
  },
  {
    id: "collab-2",
    text: "New collaboration opportunity matches your research",
    time: "Yesterday",
  },
];
const aiActivity = [
  {
    id: "ai-1",
    text: "AI Research Copilot summarized 5 papers",
    time: "1 hour ago",
  },
  {
    id: "ai-2",
    text: "New evidence insight generated from your saved research",
    time: "Yesterday",
  },
];
const continueWorking: {
  view: WorkspaceView;
  title: string;
  description: string;
} = {
  view: "ai",
  title: "Continue your research synthesis",
  description: "Review the AI-generated evidence from your recent papers.",
};

function OverviewView({ setActiveView }: OverviewViewProps) {
  return (
    <div className="space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your research and collaboration activity at a glance.
        </p>
      </header>
      <div className="space-y-6">
        <section className="space-y-3">
          <h2>Summary</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">
                Active Collaborations
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {summary.activeCollaborations}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">Saved Research</p>
              <p className="mt-2 text-3xl font-semibold">
                {summary.savedResearch}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">Pending Actions</p>
              <p className="mt-2 text-3xl font-semibold">
                {summary.pendingActions}
              </p>
            </div>
          </div>
        </section>
        <section className="space-y-3">
          <h2>Recent Research</h2>
          <div className="flex flex-col gap-3">
            {recentResearch.map((research) => (
              <article
                key={research.id}
                className="rounded-lg border border-border p-4"
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
                <button className="mt-3 text-sm font-medium text-primary hover:underline">
                  View Research
                </button>
              </article>
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <h2>Recent Collaboration Activity</h2>
          <div className="flex flex-col gap-3">
            {collaborationActivity.map((activity) => (
              <article
                key={activity.id}
                className="rounded-lg border border-border p-4"
              >
                <p>{activity.text}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {activity.time}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <h2>AI Activity</h2>
          <div className="flex flex-col gap-3">
            {aiActivity.map((activity) => (
              <article
                key={activity.id}
                className="rounded-lg border border-border p-4"
              >
                <p>{activity.text}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {activity.time}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="space-y-3">
          <h2>Continue Working</h2>

          <div className="rounded-lg border border-border p-4">
            <p className="font-medium">{continueWorking.title}</p>

            <p className="mt-1 text-sm text-muted-foreground">
              {continueWorking.description}
            </p>

            <button
              className="mt-3 rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
              onClick={() => setActiveView(continueWorking.view)}
            >
              Continue Working
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
export default OverviewView;
