import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const productsApiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/"
  }),
  tagType:['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (search) => `products/?${search}`,
      //could use 'transformReponse:' if wanted to  manipulate req here
      //if using mutations would need to use invalidate to cause a rerender
      providesTags: ['Products'] 
    }),
  })
})

export const selectProductsResult = productsApiSlice.endpoints.getProducts.select();
export const { useGetProductsQuery } = productsApiSlice;