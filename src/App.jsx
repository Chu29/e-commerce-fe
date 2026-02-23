import { Route, Routes } from "react-router-dom";
import ProductPage from "./Pages/ProductsPage";
import LandingPage from "./Pages/LandingPage";
import ProductForm from "./components/NewProductForm";
import CreateProductPage from "./Pages/CreateProductPage";

function App() {
  return (
    <Routes>
      <Route path="/" Component={LandingPage} />
      <Route path="/products" Component={ProductPage} />
      <Route path="/products/new" Component={CreateProductPage} />
    </Routes>
  );
}

export default App;
