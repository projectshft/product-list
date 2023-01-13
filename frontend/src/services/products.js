import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import queryString from 'query-string';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
  }),
  tagTypes: ['Review'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (args) => ({ url: '/products', params: queryString.stringify(args, { skipEmptyString: true }) }),
    }),
    getCategories: builder.query({
      query: () => ({ url: '/products/categories' }),
    }),
    getProductById: builder.query({
      query: (productId) => ({ url: `/products/${productId}` }),
    }),
    getReviewByProductId: builder.query({
      query: (productId) => ({ url: `/products/${productId}/reviews` }),
      providesTags: ['Review'],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
    }),
    addReviewByProductId: builder.mutation({
      query: (review) => ({
        url: `/products/${review.productId}/review`,
        method: 'POST',
        body: review,
      }),
      invalidatesTags: ['Review'],
    }),
    deleteProductById: builder.mutation({
      query: (productId) => ({
        url: `products/${productId}`,
        method: 'DELETE',
        body: { productId },
      }),
    }),
    deleteReviewById: builder.mutation({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: 'DELETE',
        body: { reviewId },
      }),
      invalidatesTags: ['Review'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductByIdQuery,
  useGetReviewByProductIdQuery,
  useAddProductMutation,
  useAddReviewByProductIdMutation,
  useDeleteProductByIdMutation,
  useDeleteReviewByIdMutation,
} = productApi;
