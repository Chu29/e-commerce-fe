import FilterBar from "../atoms/FilterBar";
import Logo from "../atoms/Logo";
import SearchBar from "../organisms/SearchBar";

const Header = () => {
  return (
    <header className="flex items-center justify-between gap-4 bg-white px-6 py-3 shadow-sm">
      <Logo />
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        <SearchBar />
        <FilterBar />
      </div>
    </header>
  );
};

export default Header;
