import FilterBar from "../components/atoms/FilterBar";
import Logo from "../components/atoms/Logo";
import Header from "../components/molecules/Header";
import Main from "../components/molecules/Main";
import SearchBar from "../components/organisms/SearchBar";

const ProductPage = () => {
  return (
    <>
      <Header>
        <Logo />
        <div className="flex items-center gap-3 w-full sm:flex-1 sm:max-w-2xl">
          <SearchBar />
          <FilterBar />
        </div>
      </Header>
      <Main />
    </>
  );
};

export default ProductPage;
