export type ProductDto = {
  _id: string
  category: string
  name: string
  price: number
  image: string
  createdAt: Date
  updatedAt: Date
}

export type ProductsListResponse = {
  products: ProductDto[]
  totalPages: number
  currentPage: number
}

export type ProductsFetchParams = {
  page?: string
  limit?: string
  category?: string
  price?: "highest" | "lowest"
  query?: string
}

export type ProductsSliceState = {
  products: ProductDto[]
  totalPages: number
  currentPage: number
  query: string | undefined
  category: string | undefined
  price: "highest" | "lowest" | undefined
  status: "idle" | "loading" | "failed" | "succeeded"
}
