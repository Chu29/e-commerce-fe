import { useRef, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { BiSearch } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../services/product.service";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["search", debouncedSearchTerm],
    queryFn: () => searchProducts(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm,
  });

  const products = data?.products ?? [];

  const handleSelect = (productId) => {
    setSearchTerm("");
    setIsOpen(false);
    navigate(`/products/${productId}/details`);
  };

  return (
    <div className="relative flex-1 min-w-0" ref={containerRef}>
      <form
        className="flex items-center rounded-lg bg-gray-100 px-3 py-2 gap-2"
        onSubmit={(e) => e.preventDefault()}
      >
        <BiSearch className="text-gray-400 text-lg shrink-0" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder-gray-400"
        />
      </form>

      {/* Search Results Dropdown */}
      {isOpen && debouncedSearchTerm && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-80 overflow-y-auto">
          {isLoading && (
            <li className="px-4 py-3 text-sm text-gray-400">Searching...</li>
          )}

          {!isLoading && products.length === 0 && (
            <li className="px-4 py-3 text-sm text-gray-400">
              No products found
            </li>
          )}

          {!isLoading &&
            products.map((product) => (
              <li
                key={product.id}
                onClick={() => handleSelect(product.id)}
                className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {Number(product.price).toLocaleString("fr-CM")} FCFA
                  </p>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
