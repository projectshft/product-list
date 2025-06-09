import { Button, ButtonGroup } from "flowbite-react"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import {
  fetchProductsAsync,
  sortByHighestPrice,
  sortByLowestPrice,
} from "@features/products/productsSlice"

export function ProductSortOrder() {
  const dispatch = useAppDispatch()

  const { price } = useAppSelector(state => state.products)

  return (
    <div className="self-center md:self-end">
      <span className="dark:text-white text-gray-950">Sort By Price</span>
      <ButtonGroup className="ms-3">
        <Button
          color="alternative"
          disabled={price === "highest"}
          onClick={() => {
            dispatch(sortByHighestPrice())
            void dispatch(fetchProductsAsync({}))
          }}
        >
          Highest
        </Button>
        <Button
          color="alternative"
          disabled={price === "lowest"}
          onClick={() => {
            dispatch(sortByLowestPrice())
            void dispatch(fetchProductsAsync({}))
          }}
        >
          Lowest
        </Button>
      </ButtonGroup>
    </div>
  )
}
