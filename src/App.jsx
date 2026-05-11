import { Route, Routes } from "react-router-dom";
import ProductPage from "./Pages/ProductsPage";
import LandingPage from "./Pages/LandingPage";
import CreateProductPage from "./Pages/CreateProductPage";
import EditProductPage from "./Pages/EditProductPage";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import CreateNewCategoryPage from "./Pages/CreateNewCategoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" Component={LandingPage} />
      <Route path="/products" Component={ProductPage} />
      <Route path="/products/new" Component={CreateProductPage} />
      <Route path="/categories/new" Component={CreateNewCategoryPage} />
      <Route path="/products/:id/edit" Component={EditProductPage} />
      <Route path="/products/:id/details" Component={ProductDetailsPage} />
    </Routes>
  );
}

export default App;
