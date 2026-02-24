import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../services/category.service";

const FilterBar = ({ value, onChange }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const categories = data?.categories ?? [];

  return (
    <select
      name="category"
      id="filter"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border border-gray-200 bg-white px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-700 outline-none cursor-pointer hover:border-gray-300 transition-colors shrink-0"
    >
      <option value="">All categories</option>
      {isError ? (
        <option disabled>Error loading categories</option>
      ) : isLoading ? (
        <option disabled>Loading...</option>
      ) : (
        categories.map((cat) => (
          <option key={cat.id} value={String(cat.id)}>
            {cat.name}
          </option>
        ))
      )}
    </select>
  );
};

export default FilterBar;
