import type { StatusFilter } from "@/types/collaboration";
import SearchInput from "./SearchInput";
type CollaborationFiltersProps = {
  searchText: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
};

function CollaborationFilters({
  searchText,
  onSearchChange,
  statusFilter,
  onStatusChange,
  onClearFilters,
  hasActiveFilters,
}: CollaborationFiltersProps) {
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
    </>
  );
}
export default CollaborationFilters;
