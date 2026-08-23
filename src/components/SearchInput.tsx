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
        className={className}
      />
    </>
  );
}

export default SearchInput;
