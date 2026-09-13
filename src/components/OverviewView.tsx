import type { WorkspaceView } from "@/types/workspace";
import { useCollaboration } from "@/context/CollaborationContext";
import { useResearch } from "@/context/ResearchContext";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  getActiveCollaborations,
  getIncomingPendingRequests,
  getMyPendingRequests,
  getRecentSavedResearch,
} from "@/utils/workspaceSelectors";

type OverviewViewProps = {
  setActiveView: (view: WorkspaceView) => void;
};

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
  const { requests, collaborations } = useCollaboration();
  const { currentMember } = useAuth();
  const { savedResearch } = useResearch();

  const activeCollaborations = getActiveCollaborations(
    collaborations,
    requests,
    currentMember,
  );
  const incomingPendingRequests = getIncomingPendingRequests(
    collaborations,
    requests,
    currentMember,
  );
  const myPendingRequests = getMyPendingRequests(
    collaborations,
    requests,
    currentMember,
  );
  const recentResearch = getRecentSavedResearch(savedResearch, 3);
  const savedResearchCount = savedResearch.length;

  return (
    <div className="space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-semibold">
          Good Morning, {currentMember?.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's what's happening with your work.
        </p>
      </header>
      <div className="space-y-6">
        <section className="space-y-3">
          <h2>Summary</h2>
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">Active Work</p>
              <p className="mt-2 text-3xl font-semibold">
                {activeCollaborations.length}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">
                Requests Need Action
              </p>
              <p className="mt-2 text-3xl font-semibold">
                {incomingPendingRequests.length}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">Pending Requests</p>
              <p className="mt-2 text-3xl font-semibold">
                {myPendingRequests.length}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">Saved Research</p>
              <p className="mt-2 text-3xl font-semibold">
                {savedResearchCount}
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2>Active Work</h2>

          {activeCollaborations.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You don't have any active work yet.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {activeCollaborations.map((collaboration) => (
                <article
                  key={collaboration.id}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <h3 className="font-medium">{collaboration.title}</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {collaboration.description}
                  </p>

                  <button
                    className="mt-3 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
                    onClick={() => setActiveView("collaboration")}
                  >
                    View Collaboration
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-3">
          <h2>Needs Attention</h2>

          {incomingPendingRequests.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You're all caught up.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {incomingPendingRequests.map((item) => (
                <article
                  key={item.request.id}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <h3 className="font-medium">{item.collaboration.title}</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    A member wants to collaborate on this project.
                  </p>

                  <button
                    className="mt-3 text-sm font-medium text-primary hover:underline"
                    onClick={() => setActiveView("collaboration")}
                  >
                    View Requests
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-3">
          <h2>Pending Requests</h2>

          {myPendingRequests.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              You don't have any pending requests.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {myPendingRequests.map(({ request, collaboration }) => (
                <article
                  key={request.id}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <h3 className="font-medium">{collaboration.title}</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {collaboration.description}
                  </p>

                  <p className="mt-3 text-sm text-muted-foreground">
                    Waiting for response
                  </p>

                  <button
                    className="mt-3 text-sm font-medium text-primary hover:underline"
                    onClick={() => setActiveView("collaboration")}
                  >
                    View Collaboration
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-3">
          <h2>Recent Research</h2>

          {savedResearchCount === 0 ? (
            <p className="text-sm text-muted-foreground">
              No saved research yet.
            </p>
          ) : (
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
                  <Link
                    to="/research"
                    className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
                  >
                    Explore Research
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="space-y-3">
          <h2>Continue Your Work</h2>

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
