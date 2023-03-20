import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../actions";

export default function Footer() {
  const products = useSelector((state) => state.product.products);

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
      dispatch(fetchProducts(page - 1))
    }
  }

  const handleNextClick = () => {
    if (products.length > 8) {
      setPage(page + 1);
      dispatch(fetchProducts(page + 1))
    }
  }

  const handlePageChange = (event) => {
    setPage(parseInt(event.target.value))
  }

  return (
    <div className="flex justify-center mb-10">
      <div className="inline-flex justify-center gap-1">
        <button
          onClick={handlePrevClick}
          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div>
          <label htmlFor="PaginationPage" className="sr-only">
            Page
          </label>

          <input
            type="number"
            className="h-8 w-12 rounded border border-gray-100 p-0 text-center text-xs font-medium [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
            value={page}
            id="PaginationPage"
            onChange={handlePageChange}
          />
        </div>

        <button
          onClick={handleNextClick}
          className="inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
