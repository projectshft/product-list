import { Badge, Dropdown, DropdownItem, Tooltip } from "flowbite-react"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import {
  fetchProductsAsync,
  filterByCategory,
  resetCategory,
} from "../productsSlice"

const categories = [
  "Tools",
  "Garden",
  "Sports",
  "Baby",
  "Music",
  "Toys",
  "Jewelry",
  "Beauty",
  "Clothing",
  "Games",
]

export const CategoryDropdown = () => {
  const dispatch = useAppDispatch()
  const { category: categoryInState } = useAppSelector(state => state.products)

  return (
    <div className="flex flex-row items-center gap-x-3">
      <Dropdown label="Category" inline>
        {categories.map(
          category =>
            categoryInState !== category && (
              <DropdownItem
                key={category}
                onClick={() => {
                  dispatch(filterByCategory(category))
                  void dispatch(fetchProductsAsync({}))
                }}
              >
                {category}
              </DropdownItem>
            ),
        )}
      </Dropdown>
      {categoryInState && (
        <Badge color="purple" className="hover:text-white cursor-pointer">
          <Tooltip content="Clear category">
            <span
              className="me-1"
              onClick={() => {
                dispatch(resetCategory())
                void dispatch(fetchProductsAsync({}))
              }}
            >
              X
            </span>

            {categoryInState}
          </Tooltip>
        </Badge>
      )}
    </div>
  )
}
