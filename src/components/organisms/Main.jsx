import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SyncLoader } from "react-spinners";
import { fetchProducts } from "../../services/product.service";
import ProductCard from "../molecules/ProductCard";
import productNotFound from "../../assets/images/product_not_found.png";

const Main = ({ selectedCategoryId }) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const handleDeleted = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  const allProducts = data?.products ?? [];
  const filteredProducts = selectedCategoryId
    ? allProducts.filter((p) => String(p.categoryId) === selectedCategoryId)
    : allProducts;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SyncLoader color="#104cab" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-20">Error loading products</p>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src={productNotFound} alt="No products available" />
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDeleted={handleDeleted}
          />
        ))}
      </div>
    </main>
  );
};

export default Main;
