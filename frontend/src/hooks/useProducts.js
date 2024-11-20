// src/hooks/useProducts.js
import useSWR from "swr";
import { api } from "../lib/api";

export const useProducts = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "products",
    api.getProducts
  );

  return {
    products: data,
    isLoading,
    isError: error,
    mutate, // ใช้สำหรับ revalidate ข้อมูล
  };
};

export const useProductsByCategory = (categoryId) => {
  const { data, error, isLoading } = useSWR(
    categoryId ? `products/category/${categoryId}` : null,
    () => api.getProductsByCategory(categoryId)
  );

  return {
    products: data,
    isLoading,
    isError: error,
  };
};

export const useProductSearch = (query) => {
  const { data, error, isLoading } = useSWR(
    query ? `products/search/${query}` : null,
    () => api.searchProducts(query)
  );

  return {
    searchResults: data,
    isLoading,
    isError: error,
  };
};
