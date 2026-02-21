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
