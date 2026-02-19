import { api } from "./api";

export const fetchCategories = async () => {
  try {
    const response = await api.get("categories");
    return await response.json();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch categories");
  }
};
