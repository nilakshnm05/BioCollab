import { useState } from "react";
import CollaborationDetails from "./CollaborationDetails";
import CollaborationControls from "./CollaborationControls";
import CollaborationHeader from "./CollaborationHeader";
import CollaborationList from "./CollaborationList";
import type {
  Collaboration,
  StatusFilter,
  SortOrder,
} from "@/types/collaboration";
// import type { CollaborationRequest } from "@/types/collaborationRequest";
import { useCollaboration } from "@/context/CollaborationContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

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

  const navigate = useNavigate();
  const { requests, addRequest } = useCollaboration();
  const { isAuthenticated, currentMember } = useAuth();
  function handleExpressInterest(collaborationId: number) {
    if (isAuthenticated && currentMember) {
      const collaboration = collabs.find(
        (collab) => collab.id === collaborationId,
      );

      if (collaboration?.createdByMemberId === currentMember.id) {
        return;
      }

      const existingRequest = requests.find(
        (request) =>
          request.collaborationId === collaborationId &&
          request.memberId === currentMember.id,
      );

      if (existingRequest) {
        return;
      }

      addRequest({
        id: Date.now(),
        collaborationId,
        memberId: currentMember.id,
        status: "pending",
        createdAt: new Date().toISOString(),
      });

      navigate("/workspace");
      return;
    }

    navigate(`/login?collaborationId=${collaborationId}`);
  }

  const existingRequest = selectedCollaboration
    ? requests.find(
        (request) =>
          request.collaborationId === selectedCollaboration.id &&
          request.memberId === currentMember?.id,
      )
    : undefined;

  const isOwner =
    selectedCollaboration?.createdByMemberId === currentMember?.id;

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
    setSortOrder("title-asc");
  };
  const hasActiveFilters = searchText !== "" || statusFilter !== "all";
  return (
    <div className="mx-auto max-w-5xl px-6 bg-gray-50 py-8">
      <CollaborationHeader
        title="Discover Collaborations"
        description="Find collaboration opportunities relevant to your work."
        action={
          <Link
            to="/discover/create"
            className="inline-flex w-fit items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            + Create Collaboration
          </Link>
        }
      />
      <div className="flex flex-col gap-5">
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
        <CollaborationList collabs={sortedCollabs} onView={handleView} />
        {collabs.length > 0 && filteredCollabs.length === 0 && (
          <p>No collaborations match your filters.</p>
        )}
      </div>
      {selectedCollaboration && (
        <>
          <CollaborationDetails
            collaboration={selectedCollaboration}
            onClose={handleClose}
            onExpressInterest={handleExpressInterest}
            existingRequest={existingRequest}
            isOwner={isOwner}
          />
        </>
      )}
    </div>
  );
}
export default CollaborationSection;
