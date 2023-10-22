import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Product } from "../types/Product";

export const useGetProductsQuery = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await apiClient.get<{ products: Product[] }>(
        `api/products`
      );
      return data.products;
    },
  });

export const useGetProductDetailsBySlugQuery = (id: string) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/${id}`)).data,
  });

export const useGetCategoriesQuery = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: async () =>
      (await apiClient.get<[]>(`/api/products/categories`)).data,
  });
