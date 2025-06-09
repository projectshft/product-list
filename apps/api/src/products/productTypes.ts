export interface ProductDto {
  _id: string;
  category: string;
  name: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductListResponse {
  products: ProductDto[];
  totalPages: number;
  currentPage: number;
}

export interface ProductQueryParams {
  page?: string;
  limit?: string;
  category?: string;
  price?: 'highest' | 'lowest';
  query?: string;
}

export interface ProductCreationParams {
  name: string;
  category: string;
  price: number;
  image: string;
}
