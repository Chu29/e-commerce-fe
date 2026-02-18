import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // TODO: API Call Logic to search for products here
    }
  }, [debouncedSearchTerm]);
  return (
    <form className="flex items-center flex-1 rounded-lg bg-gray-100 px-3 py-2 gap-2">
      <BiSearch className="text-gray-400 text-lg shrink-0" />
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-400"
      />
    </form>
  );
};

export default SearchBar;
