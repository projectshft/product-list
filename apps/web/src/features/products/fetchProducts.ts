import type {
  ProductsFetchParams,
  ProductsListResponse,
} from "@features/products"

export const fetchProducts = async (
  params: ProductsFetchParams,
): Promise<ProductsListResponse> => {
  const response = await fetch(buildFetchProductsUrl(params))
  if (!response.ok) {
    throw new Error("[fetchProducts] API response error")
  }
  return (await response.json()) as ProductsListResponse
}

const buildFetchProductsUrl = (params: ProductsFetchParams): string => {
  if (!import.meta.env.VITE_API_URL)
    throw new Error("[buildFetchProductsUrl] base url not defined")
  const baseProductsUrl = `${import.meta.env.VITE_API_URL as string}/products`
  const filteredParams = filterParams(params)
  if (Object.keys(filteredParams).length === 0) {
    return baseProductsUrl
  }
  return `${baseProductsUrl}?${returnParamsString(params)}`
}

const returnParamsString = (params: ProductsFetchParams): string => {
  return new URLSearchParams(filterParams(params)).toString()
}

const filterParams = (params: ProductsFetchParams) => {
  return Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Object.entries(params).filter(([, /* unused */ value]) => value),
  )
}
