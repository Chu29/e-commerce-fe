const FilterBar = () => {
  const options = ["All Categories", "Electronics", "Clothing", "Books"];
  return (
    <select
      name="category"
      id="filter"
      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none cursor-pointer hover:border-gray-300 transition-colors"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default FilterBar;
