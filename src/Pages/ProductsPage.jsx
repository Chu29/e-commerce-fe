import { PiPlus, PiPlusBold } from "react-icons/pi";
import FilterBar from "../components/atoms/FilterBar";
import Logo from "../components/atoms/Logo";
import Header from "../components/molecules/Header";
import Main from "../components/molecules/Main";
import SearchBar from "../components/organisms/SearchBar";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header>
        <Logo />
        <div className="flex items-center gap-3 w-full sm:flex-1 sm:max-w-2xl">
          <SearchBar />
          <FilterBar />
        </div>
      </Header>
      <div className=" flex items-center justify-between px-4 py-3 sm:px-6 ">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex flex-col ">
          Inventory{" "}
          <span className="text-gray-500 text-xs sm:text-sm font-extralight">
            Manage your product catalogue
          </span>
        </h1>
        <button
          onClick={() => navigate("/products/new")}
          className="mt-4 bg-[#3b3bf5] text-white px-4 py-2 rounded-lg hover:bg-[#2a2ae0] cursor-pointer transition-colors flex items-center gap-2"
        >
          <PiPlusBold className="text-lg" /> Create Product
        </button>
      </div>
      <Main />
    </>
  );
};

export default ProductPage;
