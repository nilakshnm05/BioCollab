import type { Collaboration } from "@/types/collaboration";
import { CollaborationRequest } from "@/types/collaborationRequest";
import type { Member } from "@/types/member";
import type { SavedResearch } from "@/types/research";

export function getActiveCollaborations(
  collaborations: Collaboration[],
  requests: CollaborationRequest[],
  currentMember: Member | null,
): Collaboration[] {
  if (!currentMember) {
    return [];
  }

  const seen = new Set<number>();

  return requests
    .filter((request) => request.status === "accepted")
    .map((request) => {
      const collaboration = collaborations.find(
        (collaboration) => collaboration.id === request.collaborationId,
      );
      return { request, collaboration };
    })
    .filter((item) => item.collaboration !== undefined)
    .filter(
      (item) =>
        currentMember.id === item.collaboration?.createdByMemberId ||
        currentMember.id === item.request.memberId,
    )
    .map((item) => item.collaboration)
    .filter(
      (collaboration): collaboration is Collaboration =>
        collaboration !== undefined,
    )
    .filter((collaboration) => {
      if (seen.has(collaboration.id)) {
        return false;
      }
      seen.add(collaboration.id);
      return true;
    });
}

type IncomingPendingRequest = {
  collaboration: Collaboration;
  request: CollaborationRequest;
};
export function getIncomingPendingRequests(
  collaborations: Collaboration[],
  requests: CollaborationRequest[],
  currentMember: Member | null,
): IncomingPendingRequest[] {
  if (!currentMember) {
    return [];
  }

  return requests
    .filter((request) => request.status === "pending")
    .map((request) => {
      const collaboration = collaborations.find(
        (collaboration) => collaboration.id === request.collaborationId,
      );
      return {
        collaboration,
        request,
      };
    })
    .filter(
      (item) =>
        item.collaboration?.createdByMemberId === currentMember.id &&
        item.request.memberId !== currentMember.id,
    )
    .filter(
      (item): item is IncomingPendingRequest =>
        item.collaboration !== undefined,
    );
}

type MyPendingRequest = {
  collaboration: Collaboration;
  request: CollaborationRequest;
};
export function getMyPendingRequests(
  collaborations: Collaboration[],
  requests: CollaborationRequest[],
  currentMember: Member | null,
): MyPendingRequest[] {
  if (!currentMember) {
    return [];
  }
  return requests
    .filter((request) => request.status === "pending")
    .filter((request) => request.memberId === currentMember.id)
    .map((request) => {
      const collaboration = collaborations.find(
        (collaboration) => collaboration.id === request.collaborationId,
      );
      return {
        collaboration,
        request,
      };
    })
    .filter(
      (item): item is MyPendingRequest => item.collaboration !== undefined,
    );
}

export function getRecentSavedResearch(
  savedResearch: SavedResearch[],
  limit: number,
): SavedResearch[] {
  const copySavedResearch = [...savedResearch];
  return copySavedResearch
    .sort((a, b) => {
      return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
    })
    .slice(0, limit);
}
