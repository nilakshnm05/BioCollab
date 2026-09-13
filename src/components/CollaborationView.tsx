import { getActiveCollaborations } from "@/utils/workspaceSelectors";
import { statusLabels, statusStyles } from "@/constants/collaboration";
import { Link } from "react-router-dom";
import { useCollaboration } from "@/context/CollaborationContext";
import { useAuth } from "@/context/AuthContext";

function CollaborationView() {
  const { collaborations, requests, updateRequestStatus } = useCollaboration();
  const { currentMember } = useAuth();

  const pendingRequests = requests.filter((request) => {
    const collaboration = collaborations.find(
      (collaboration) => collaboration.id === request.collaborationId,
    );

    return (
      request.status === "pending" &&
      collaboration?.createdByMemberId === currentMember?.id &&
      request.memberId !== currentMember?.id
    );
  });
  const myRequests = requests
    .filter((request) => request.memberId === currentMember?.id)
    .map((request) => {
      const collaboration = collaborations.find(
        (collaboration) => collaboration.id === request.collaborationId,
      );

      if (!collaboration) return null;

      return {
        request,
        collaboration,
      };
    })
    .filter((item) => item !== null);
    
  const activeCollaborations = getActiveCollaborations(
    collaborations,
    requests,
    currentMember,
  );

  const collaborationSummary = {
    activeCollaborations: activeCollaborations.length,
    pendingRequests: pendingRequests.length,
    myRequests: myRequests.length,
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
            <p className="text-sm text-muted-foreground">Incoming Requests</p>
            <p className="mt-2 text-3xl font-semibold">
              {collaborationSummary.pendingRequests}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-background p-4">
            <p className="text-sm text-muted-foreground">My Requests</p>
            <p className="mt-2 text-3xl font-semibold">
              {collaborationSummary.myRequests}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2>Incoming Requests</h2>

        {pendingRequests.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No pending collaboration requests.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {pendingRequests.map((request) => {
              const collaboration = collaborations.find(
                (collaboration) => collaboration.id === request.collaborationId,
              );

              if (!collaboration) return null;

              return (
                <article
                  key={request.id}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <h3 className="font-medium">{collaboration.title}</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    A Member has expressed interest in this collaboration.
                  </p>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() =>
                        updateRequestStatus(request.id, "accepted")
                      }
                      className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        updateRequestStatus(request.id, "rejected")
                      }
                      className="rounded-md border border-border px-3 py-2 text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2>Active Collaborations</h2>

        {activeCollaborations.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No active collaborations.
          </p>
        ) : (
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
        )}
      </section>

      <section className="space-y-3">
        <h2>My Requests</h2>

        {myRequests.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            You haven't expressed interest in any collaborations yet.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {myRequests.map(({ request, collaboration }) => (
              <article
                key={request.id}
                className="rounded-lg border border-border bg-background p-4"
              >
                <h3 className="font-medium">{collaboration.title}</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {collaboration.description}
                </p>

                <p className="mt-3 text-sm">
                  Request status:{" "}
                  <span className="font-medium capitalize">
                    {request.status}
                  </span>
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-3">
        <h2>Discover</h2>

        <div className="rounded-lg border border-border bg-background p-4">
          <p className="font-medium">Find new collaborators</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Explore members and collaboration opportunities that match your
            interests.
          </p>

          <Link
            to="/discover"
            className="mt-3 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Explore Collaborations
          </Link>
        </div>
      </section>
    </div>
  );
}
export default CollaborationView;
