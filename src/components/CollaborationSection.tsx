import CollaborationCard from "./CollaborationCard";
import { useState } from "react";
import CollaborationDetails from "./CollaborationDetails";
import type { Collaboration } from "@/types/collaboration";
type CollaborationsProps = {
  collabs: Collaboration[];
};
function CollaborationSection({ collabs }: CollaborationsProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  function handleView(id: number) {
    setSelectedId(id);
  }
  const selectedCollaboration = collabs.find((collab) => {
    return collab.id === selectedId;
  });
  function handleClose() {
    setSelectedId(null);
  }
  return (
    <>
      {collabs.length > 0
        ? collabs.map((collab) => {
            return (
              <CollaborationCard
                key={collab.id}
                id={collab.id}
                title={collab.title}
                description={collab.description}
                status={collab.status}
                onView={handleView}
              />
            );
          })
        : "No Collaboartions Found"}
      {selectedCollaboration && (
        <>
          <CollaborationDetails
            collaboration={selectedCollaboration}
            onClose={handleClose}
          />
        </>
      )}
    </>
  );
}
export default CollaborationSection;
