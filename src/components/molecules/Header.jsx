import FilterBar from "../atoms/FilterBar";
import Logo from "../atoms/Logo";
import SearchBar from "../organisms/SearchBar";

const Header = () => {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 bg-white px-4 sm:px-6 py-3 shadow-sm">
      <Logo />
      <div className="flex items-center gap-3 w-full sm:flex-1 sm:max-w-2xl">
        <SearchBar />
        <FilterBar />
      </div>
    </header>
  );
};

export default Header;
