import type { Collaboration } from "@/types/collaboration";
import { statusLabels } from "@/contants/collaboration";

type CollaborationProps = { collaboration: Collaboration; onClose: () => void };

function CollaborationDetails({ collaboration, onClose }: CollaborationProps) {
  return (
    <>
      <h2>{collaboration.title}</h2>
      <p>{collaboration.description}</p>
      <p>{statusLabels[collaboration.status]}</p>
      <button onClick={onClose}>Close</button>
    </>
  );
}

export default CollaborationDetails;
