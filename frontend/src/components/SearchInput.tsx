type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};
function SearchInput({ value, onChange, className }: SearchInputProps) {
  return (
    <>
      <input
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        placeholder="Search Collaborations..."
        className={`bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 ${className ?? ""}`}
      />
    </>
  );
}

export default SearchInput;
