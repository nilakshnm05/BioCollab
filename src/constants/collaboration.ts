import type { CollaborationStatus } from "@/types/collaboration";

export const statusLabels: Record<CollaborationStatus, string> = {
  open: "Open",
  looking: "Looking for collaborations",
  closed: "Closed",
};

export const statusStyles: Record<CollaborationStatus, string> = {
  open: "bg-green-100 text-green-700",
  looking: "bg-amber-100 text-amber-700",
  closed: "bg-gray-100 text-gray-700",
};