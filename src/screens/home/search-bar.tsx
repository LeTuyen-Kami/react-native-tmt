import { SearchField } from "heroui-native";
import { useState } from "react";

const SearchBar = () => {
  const [value, setValue] = useState("");

  const onChange = (value: string) => {
    setValue(value);
  };

  return (
    <SearchField value={value} onChange={onChange} className="px-4">
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  );
};

export default SearchBar;
