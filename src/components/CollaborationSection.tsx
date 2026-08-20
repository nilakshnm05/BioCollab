import CollaborationCard from "./CollaborationCard";
import { useState } from "react";
import CollaborationDetails from "./CollaborationDetails";
import SearchInput from "./SearchInput";
import type { Collaboration, CollaborationStatus } from "@/types/collaboration";
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
  const [searchText, setSearchText] = useState<string>("");
  type StatusFilter = "all" | CollaborationStatus;
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const filteredCollabs = collabs.filter((collab) => {
    return (
      collab.title
        .trim()
        .toLowerCase()
        .includes(searchText.trim().toLowerCase()) &&
      (statusFilter === "all" || collab.status === statusFilter)
    );
  });
  return (
    <>
      <SearchInput value={searchText} onChange={setSearchText} />
      <select
        value={statusFilter}
        onChange={(event) => {
          setStatusFilter(event.target.value as StatusFilter);
        }}
      >
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="looking">Looking for collaborations</option>
        <option value="closed">Closed</option>
      </select>
      {collabs.length === 0 && <p>No Collaborations Found.</p>}
      {filteredCollabs.map((collab) => {
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
      })}
      {collabs.length > 0 && filteredCollabs.length === 0 && (
        <p>No collaborations match your filters.</p>
      )}
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
