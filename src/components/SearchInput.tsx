type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};
function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <>
      <input
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </>
  );
}

export default SearchInput;
