import CollaborationCard from "./CollaborationCard";
import { useState } from "react";
import CollaborationDetails from "./CollaborationDetails";
import CollaborationControls from "./CollaborationControls";
import type {
  Collaboration,
  StatusFilter,
  SortOrder,
} from "@/types/collaboration";
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
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("title-asc");
  const filteredCollabs = collabs.filter((collab) => {
    return (
      collab.title
        .trim()
        .toLowerCase()
        .includes(searchText.trim().toLowerCase()) &&
      (statusFilter === "all" || collab.status === statusFilter)
    );
  });
  const sortedCollabs = [...filteredCollabs];
  sortedCollabs.sort((a, b) => {
    if (sortOrder === "title-asc") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });
  const handleClearFilters = () => {
    setSearchText("");
    setStatusFilter("all");
  };
  const hasActiveFilters = searchText !== "" || statusFilter !== "all";
  return (
    <>
      <CollaborationControls
        searchText={searchText}
        onSearchChange={setSearchText}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
      {collabs.length === 0 && <p>No Collaborations Found.</p>}
      {sortedCollabs.map((collab) => {
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
