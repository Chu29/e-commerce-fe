import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../services/category.service";

const FilterBar = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const options = data?.categories.map((category) => category.name) || [];
  return (
    <select
      name="category"
      id="filter"
      className="rounded-lg border border-gray-200 bg-white px-2 sm:px-3 py-2 text-xs sm:text-sm text-gray-700 outline-none cursor-pointer hover:border-gray-300 transition-colors shrink-0"
    >
      <option value="">All categories</option>
      {isError ? (
        <option value="">Error loading categories</option>
      ) : isLoading ? (
        <option value="">Loading...</option>
      ) : (
        options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))
      )}
    </select>
  );
};

export default FilterBar;
