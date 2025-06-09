import { Badge, TextInput, Tooltip } from "flowbite-react"
import debounce from "lodash.debounce"
import { useCallback, useState } from "react"
import { useAppDispatch, useAppSelector } from "@app/hooks"
import {
  fetchProductsAsync,
  resetQuery,
  setQuery,
} from "@features/products/productsSlice"

export const SearchInput = () => {
  const dispatch = useAppDispatch()
  const { query: queryInState } = useAppSelector(state => state.products)
  const [inputValue, setInputValue] = useState<string>("")

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch(setQuery(query))
      void dispatch(fetchProductsAsync({}))
    }, 500),
    [dispatch],
  )

  return (
    <div className="relative">
      <TextInput
        id="base"
        type="text"
        sizing="md"
        placeholder="Search..."
        className="w-auto md:w-md lg:w-xl"
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value)
          debouncedSearch(e.target.value)
        }}
      />
      {queryInState && (
        <Badge
          color="purple"
          className="z-100 absolute right-5 top-1/2 transform -translate-y-1/2 font-semibold hover:text-indigo-700 cursor-pointer"
        >
          <Tooltip content="Clear category">
            <span
              className="me-1"
              onClick={() => {
                dispatch(resetQuery())
                setInputValue("")
                void dispatch(fetchProductsAsync({}))
              }}
            >
              X
            </span>

            {queryInState}
          </Tooltip>
        </Badge>
      )}
    </div>
  )
}
