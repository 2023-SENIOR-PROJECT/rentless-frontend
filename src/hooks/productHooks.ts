import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Product } from "../types/Product";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await apiClient.get<{ products: Product[] }>(
        `/product-service/api/products`
      );
      return data;
    },
  });

export const useGetProductDetailsBySlugQuery = (id: string) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: async () =>
      (await apiClient.get<Product>(`/product-service/api/products/${id}`))
        .data,
  });

export const useGetCategoriesQuery = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      (await apiClient.get<[]>(`/product-service/api/products/categories`))
        .data,
  });
