import type { Collaboration } from "@/types/collaboration";
import type { CollaborationRequest } from "@/types/collaborationRequest";
import { statusLabels, statusStyles } from "@/constants/collaboration";

type CollaborationProps = {
  collaboration: Collaboration;
  onClose: () => void;
  onExpressInterest: (collaborationId: number) => void;
  existingRequest: CollaborationRequest | undefined;
  isOwner: boolean;
};

function CollaborationDetails({
  collaboration,
  onClose,
  onExpressInterest,
  existingRequest,
  isOwner,
}: CollaborationProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">{collaboration.title}</h2>
          <span
            className={`inline-flex px-2 py-1 rounded-full ${statusStyles[collaboration.status]}`}
          >
            {statusLabels[collaboration.status]}
          </span>
        </div>
        <p className="text-sm text-gray-600">{collaboration.description}</p>
        <div className="flex flex-wrap gap-3">
          <p className="text-sm font-semibold text-gray-600">
            Collaboration Type:
          </p>

          <p className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
            {collaboration.collaborationType}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <p className="text-sm font-semibold text-gray-600">Expertise:</p>
          {collaboration.expertise.map((element) => {
            return (
              <p
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                key={element}
              >
                {element}
              </p>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-3">
          <p className="text-sm font-semibold text-gray-600">Research Areas:</p>
          {collaboration.researchAreas.map((element) => {
            return (
              <p
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                key={element}
              >
                {element}
              </p>
            );
          })}
        </div>
        <div className="mt-2 flex items-center justify-between border-t pt-4">
          <div>
            {!existingRequest && collaboration.status !== "closed" && !isOwner && (
              <button
                onClick={() => onExpressInterest(collaboration.id)}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Express Interest
              </button>
            )}

            {existingRequest?.status === "pending" && (
              <p className="text-sm font-medium text-muted-foreground">
                Interest Sent — Pending
              </p>
            )}

            {existingRequest?.status === "accepted" && (
              <p className="text-sm font-medium text-primary">
                Collaboration Active
              </p>
            )}

            {existingRequest?.status === "rejected" && (
              <p className="text-sm font-medium text-destructive">
                Request Rejected
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CollaborationDetails;
