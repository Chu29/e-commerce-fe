import { Route, Routes } from "react-router-dom";
import ProductPage from "./Pages/ProductsPage";
import LandingPage from "./Pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" Component={LandingPage} />
      <Route path="/products" Component={ProductPage} />
    </Routes>
  );
}

export default App;
