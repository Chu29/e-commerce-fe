import { Route, Routes } from "react-router-dom";
import ProductPage from "./Pages/ProductsPage";

function App() {
  return (
    <Routes>
      <Route path="/products" Component={ProductPage} />
    </Routes>
  );
}

export default App;
