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

export const createCategory = async (categoryData) => {
  try {
    const response = await api.post("categories", { json: categoryData });
    return await response.json();
  } catch (error) {
    console.log(error);
    const errorResponse = await error.response?.json().catch(() => null);
    throw new Error(errorResponse?.error || "Failed to create category");
  }
};
