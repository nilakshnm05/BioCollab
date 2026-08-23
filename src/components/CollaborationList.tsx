import CollaborationCard from "./CollaborationCard";
import type { Collaboration } from "@/types/collaboration";
type CollaborationListProps = {
  collabs: Collaboration[];
  onView: (id: number) => void;
};

function CollaborationList({ collabs, onView }: CollaborationListProps) {
  return (
    <>
      {collabs.map((collab) => {
        return (
          <CollaborationCard
            key={collab.id}
            id={collab.id}
            title={collab.title}
            description={collab.description}
            status={collab.status}
            onView={onView}
          />
        );
      })}
    </>
  );
}
export default CollaborationList;
