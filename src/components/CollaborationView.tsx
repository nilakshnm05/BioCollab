import type { Collaboration } from "@/types/collaboration";
import { collaborations } from "@/data/collaborations";
import { statusLabels, statusStyles } from "@/constants/collaboration";
import { Link } from "react-router-dom";
import { useCollaboration } from "@/context/CollaborationContext";

const activeCollaborations: Collaboration[] = [
  collaborations[0],
  collaborations[1],
];

const collaborationActivity = [
  {
    id: "activity-1",
    text: "Dr. Mehta accepted your collaboration request",
    time: "2 hours ago",
  },
  {
    id: "activity-2",
    text: "A new researcher matched your drug discovery interests",
    time: "Yesterday",
  },
  {
    id: "activity-3",
    text: "You joined the AI Diagnostics collaboration",
    time: "2 days ago",
  },
];

function CollaborationView() {
  const { requests } = useCollaboration();

  const collaborationSummary = {
    activeCollaborations: 2,
    pendingRequests: requests.length,
    savedResearchers: 5,
  };

  return (
    <div className="space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-semibold">Collaboration</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your research collaborations and collaboration activity.
        </p>
      </header>

      <section className="space-y-3">
        <h2>Summary</h2>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">
              Active Collaborations
            </p>
            <p className="mt-2 text-3xl font-semibold">
              {collaborationSummary.activeCollaborations}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">Pending Requests</p>
            <p className="mt-2 text-3xl font-semibold">
              {collaborationSummary.pendingRequests}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">Saved Researchers</p>
            <p className="mt-2 text-3xl font-semibold">
              {collaborationSummary.savedResearchers}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2>Active Collaborations</h2>

        <div className="flex flex-col gap-3">
          {activeCollaborations.map((collaboration) => (
            <article
              key={collaboration.id}
              className="rounded-lg border border-border bg-background p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-medium">{collaboration.title}</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {collaboration.description}
                  </p>
                </div>

                <span
                  className={`self-start rounded-full px-2 py-1 text-xs ${statusStyles[collaboration.status]}`}
                >
                  {statusLabels[collaboration.status]}
                </span>
              </div>

              <p className="mt-3 text-sm text-muted-foreground">
                {collaboration.researchAreas.join(" · ")}
              </p>
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
              className="rounded-lg border border-border bg-background p-4"
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
        <h2>Discover</h2>

        <div className="rounded-lg border border-border bg-background p-4">
          <p className="font-medium">Find new collaborators</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Explore researchers and collaboration opportunities that match your
            interests.
          </p>

          <Link
            to="/discover"
            className="mt-3 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Discover Collaborators
          </Link>
        </div>
      </section>
    </div>
  );
}
export default CollaborationView;
