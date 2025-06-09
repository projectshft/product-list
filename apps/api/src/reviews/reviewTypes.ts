export interface ReviewDto {
  _id: string;
  text: string;
  rating: number;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewListResponse {
  reviews: ReviewDto[];
  totalPages: number;
  currentPage: number;
}

export interface ReviewQueryParams {
  page?: string;
  limit?: string;
}

export interface ReviewCreationParams {
  text: string;
  rating: number;
  productId: string;
}
