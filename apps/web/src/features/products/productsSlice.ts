import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "@app/createAppSlice"
import type { RootState } from "@app/store"
import { fetchProducts } from "@features/products"
import type { ProductsFetchParams, ProductsSliceState } from "@features/products"

const initialState: ProductsSliceState = {
  products: [],
  totalPages: 0,
  currentPage: 0,
  query: undefined,
  category: undefined,
  price: undefined,
  status: "idle",
}

export const productsSlice = createAppSlice({
  name: "products",
  initialState,
  reducers: create => ({
    setQuery: create.reducer((state, action: PayloadAction<string>) => {
      state.query = action.payload
    }),
    resetQuery: create.reducer(state => {
      state.query = undefined
    }),
    sortByHighestPrice: create.reducer(state => {
      state.price = "highest"
    }),
    sortByLowestPrice: create.reducer(state => {
      state.price = "lowest"
    }),
    filterByCategory: create.reducer((state, action: PayloadAction<string>) => {
      state.category = action.payload
    }),
    resetCategory: create.reducer(state => {
      state.category = undefined
    }),
    fetchProductsAsync: create.asyncThunk(
      async (params: ProductsFetchParams, thunkApi) => {
        const { products } = thunkApi.getState() as RootState

        const response = await fetchProducts({
          ...params,
          query: products.query,
          price: products.price,
          category: products.category,
        })
        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "succeeded"
          state.products = action.payload.products
          state.currentPage = action.payload.currentPage
          state.totalPages = action.payload.totalPages
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  selectors: {
    selectProducts: products => products.products,
    selectCurrentPage: products => products.currentPage,
    selectTotalPages: products => products.totalPages,
    selectStatus: products => products.status,
    selectPrice: products => products.price,
    selectCategory: products => products.category,
  },
})

export const {
  fetchProductsAsync,
  sortByHighestPrice,
  sortByLowestPrice,
  filterByCategory,
  resetCategory,
  setQuery,
  resetQuery,
} = productsSlice.actions

export const {
  selectProducts,
  selectCurrentPage,
  selectTotalPages,
  selectStatus,
} = productsSlice.selectors
