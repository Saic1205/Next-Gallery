import React from "react";

type SearchBoxProps = {
  onSearch: (query: string) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      type="text"
      className="form-control p-2 rounded-lg"
      placeholder="Search albums..."
      onChange={handleSearch}
    />
  );
};

export default SearchBox;
