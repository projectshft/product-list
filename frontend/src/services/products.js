import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import queryString from 'query-string';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/products',
  }),
  tagTypes: ['Review'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (args) => ({ url: '', params: queryString.stringify(args, { skipEmptyString: true }) }),
    }),
    getCategories: builder.query({
      query: () => ({ url: '/categories' }),
    }),
    getProductById: builder.query({
      query: (productId) => ({ url: `/${productId}` }),
    }),
    getReviewByProductId: builder.query({
      query: (productId) => ({ url: `/${productId}/reviews` }),
      providesTags: ['Review'],
    }),
    addProduct: builder.mutation({
      query: (product) => ({
        url: '/',
        method: 'POST',
        body: product,
      }),
    }),
    addReviewByProductId: builder.mutation({
      query: (review) => ({
        url: `/${review.productId}/review`,
        method: 'POST',
        body: review,
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
} = productApi;
