import type { CollaborationStatus } from "@/types/collaboration";

export const statusLabels: Record<CollaborationStatus, string> = {
  open: "Open",
  looking: "Looking for collaborations",
  closed: "Closed",
};
