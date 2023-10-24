import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Product } from "../types/Product";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await apiClient.get<{ products: Product[] }>(
        `http://localhost:8081/api/products`
      );
      return data;
    },
  });

export const useGetProductDetailsBySlugQuery = (id: string) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: async () =>
      (await apiClient.get<Product>(`http://localhost:8081/api/products/${id}`))
        .data,
  });

export const useGetCategoriesQuery = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      (await apiClient.get<[]>(`http://localhost:8081/api/products/categories`))
        .data,
  });
