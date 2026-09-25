export type CollaborationRequestStatus = "pending" | "accepted" | "rejected";

export type CollaborationRequest = {
  id: number;
  collaborationId: number;
  memberId: number;
  status: CollaborationRequestStatus;
  createdAt: string;
};
