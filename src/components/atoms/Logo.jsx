import { useNavigate } from "react-router-dom";
import logo from "/logo.png";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/")}
      className=" cursor-pointer text-lg sm:text-xl font-bold text-gray-800 whitespace-nowrap"
    >
      <img
        src={logo}
        alt="E-Buy Logo"
        className="w-12 h-12 sm:w-20 sm:h-20 mr-2 inline-block"
      />
      <p className="inline-block align-middle">E-Buy</p>
    </div>
  );
};

export default Logo;
