export interface ReviewDTO {
  id: number;
  title?: string;
  comment?: string;
  name?: string;
  created_at: Date;
  rate: number;
}

export interface GetReviewResponseAPIDTO {
  avg_rate: number;
  number_reviews: number;
  reviews: ReviewDTO[];
}
