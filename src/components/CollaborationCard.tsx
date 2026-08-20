type CollaborationCardProps = {
  id: number;
  title: string;
  description: string;
  status: CollaborationStatus;
  onView: (id: number) => void;
};
import type { CollaborationStatus } from "@/types/collaboration";
import { statusLabels } from "@/constants/collaboration";
function CollaborationCard({
  id,
  title,
  description,
  status,
  onView,
}: CollaborationCardProps) {
  return (
    <>
      <p>{id}</p>
      <p>{title}</p>
      <p>{description}</p>
      <p>{statusLabels[status]}</p>
      <button onClick={() => onView(id)}>View</button>
    </>
  );
}

export default CollaborationCard;
