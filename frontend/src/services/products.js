import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/api/products"}), 
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (queryString) => ({url: `${queryString}`})
    }),
    getCategories: builder.query({
      query: () => ({url: '/categories'})
    }),
    getProductById: builder.query({
      query: (productId) => ({url: `/product/${productId}`})
    }), 
    addProduct: builder.mutation({
      query: (product) => ({
        url: '/',
        method: 'POST',
        body: product
      })
    })
  })
})

export const  { useGetProductsQuery, useLazyGetProductsQuery, useGetCategoriesQuery, useGetProductByIdQuery, useAddProductMutation } = productApi
