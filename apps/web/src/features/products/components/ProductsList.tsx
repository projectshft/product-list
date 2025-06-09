import { type ReactNode, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import { fetchProductsAsync } from "@features/products/productsSlice"
import { ProductCard } from "@features/products/components"

export const ProductsList = (): ReactNode => {
  const dispatch = useAppDispatch()

  const { products, status } = useAppSelector(state => state.products)

  useEffect(() => {
    if (status === "idle") void dispatch(fetchProductsAsync({}))
  }, [dispatch, status])

  if (status === "loading")
    return <p className="p-5 self-center">Loading products...</p>
  if (status === "failed") return <p className="p-5 self-center">Error</p>
  if (products.length === 0)
    return <p className="p-5 self-center">No products found</p>
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
      {products.map(product => (
        <ProductCard key={product._id} {...product} />
      ))}
    </div>
  )
}
