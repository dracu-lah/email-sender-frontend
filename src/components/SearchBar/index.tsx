import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { Input } from "@/components/ui/input";
import { handleKeyDown } from "@/utils/functions/searchBarSearch";
import { useDebounce } from "@/utils/functions/useDebounce";
import clsx from "clsx";

const SearchBar = ({ placeholder = "Search... (Ctrl+/)", className }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter");
  const [searchValue, setSearchValue] = useState(filter || "");
  const inputRef = useRef(null);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    const handleKeyDownEvent = (event) => handleKeyDown(event, inputRef);

    document.addEventListener("keydown", handleKeyDownEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyDownEvent);
    };
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("filter", debouncedSearchValue);
    setSearchParams(newParams);
  }, [debouncedSearchValue, searchParams, setSearchParams]);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <Input
      type="text"
      className={clsx("w-80", className)}
      placeholder={placeholder}
      ref={inputRef}
      value={searchValue}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
