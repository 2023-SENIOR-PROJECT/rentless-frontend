import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { GetReviewResponseAPIDTO, ReviewDTO } from "../types/Review";

export const useGetProductReviewsQuery = (productId: string) =>
  useQuery({
    queryKey: ["reviews", productId],
    queryFn: async () =>
      (
        await apiClient.get<GetReviewResponseAPIDTO>(
          `/review-service/reviews/${productId}`,
          { withCredentials: true }
        )
      ).data.reviews,
  });

export const useCreateReviewMutation = (productId: string) =>
  useMutation({
    mutationFn: async (review: { rate: number; comment: string }) =>
      (
        await apiClient.post<{ message: string; order: ReviewDTO }>(
          `/review-service/reviews/${productId}`,
          review
        )
      ).data,
  });
