import { api } from "./api";

export const fetchProducts = async () => {
  try {
    const response = await api.get("products");
    return await response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products");
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await api.post("products", { json: productData });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create product");
  }
};

export const uploadProductImage = async (productId, file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    const response = await api.post(`product/${productId}/image`, {
      body: formData,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to upload product image");
  }
};

export const fetchProductById = async (productId) => {
  try {
    const response = await api.get(`products/${productId}`);
    return await response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch product");
  }
};

export const editProduct = async (productId, productData) => {
  try {
    const response = await api.patch(`products/${productId}`, {
      json: productData,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to edit product");
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await api.get(`products/search`, {
      searchParams: { search: query },
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to search products");
  }
};
