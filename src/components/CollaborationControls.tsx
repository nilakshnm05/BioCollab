import type { SortOrder, StatusFilter } from "@/types/collaboration";
import SearchInput from "./SearchInput";
type CollaborationControlsProps = {
  searchText: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  sortOrder: SortOrder;
  onSortChange: (value: SortOrder) => void;
};

function CollaborationControls({
  searchText,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onClearFilters,
  hasActiveFilters,
  sortOrder,
  onSortChange,
}: CollaborationControlsProps) {
  return (
    <>
      <SearchInput value={searchText} onChange={onSearchChange} />
      <select
        value={statusFilter}
        onChange={(event) => {
          onStatusChange(event.target.value as StatusFilter);
        }}
      >
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="looking">Looking for collaborations</option>
        <option value="closed">Closed</option>
      </select>
      {hasActiveFilters && (
        <button onClick={onClearFilters}>Clear Filters</button>
      )}
      <select
        value={sortOrder}
        onChange={(event) => onSortChange(event.target.value as SortOrder)}
      >
        <option value="title-asc">A-Z</option>
        <option value="title-desc">Z-A</option>
      </select>
    </>
  );
}
export default CollaborationControls;
