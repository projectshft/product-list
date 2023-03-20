import { useDispatch } from "react-redux";
import { fetchProducts} from "../actions";

export default function Nav() {

  const dispatch = useDispatch();

  const handleQuery = (event) => {
    let query = event.target.value
    dispatch(fetchProducts("", query, "", ""))
  }

  const handleCategory = (event) => {
    let category = event.target.value
    localStorage.setItem("selectedCategory", category);
    dispatch(fetchProducts("", "", category, ""))
  }

  const handlePrice = (event) => {
    let price = event.target.value
    localStorage.setItem("selectedPrice", price);
    dispatch(fetchProducts("", "", "", price))
  }

  return (
    <div>
      <header className="shadow-sm">
        <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <form className="mb-0 lg:flex">
              <div className="relative">
                <input
                  className="h-10 rounded-lg border-gray-200 pr-10 text-sm placeholder-gray-300 focus:z-10"
                  placeholder="Search..."
                  type="search"
                  onChange={handleQuery}
                />

                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 rounded-r-lg p-2 text-gray-600"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <div className="items-center gap-4 lg:flex">
            <div className="relative">
              <select className="h-10 rounded-lg border-gray-200 pr-10 text-sm placeholder-gray-300 focus:z-10" onChange={handleCategory}>
                <option>Sort by Category</option>
                <option>Beauty</option>
                <option>Books</option>
                <option>Clothing</option>
                <option>Electronics</option>
                <option>Garden</option>
                <option>Grocery</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>

            <div className="relative">
              <select
                className="h-10 rounded-lg border-gray-200 pr-10 text-sm placeholder-gray-300 focus:z-10" onChange={handlePrice}>
                <option>Sort by Price</option>
                <option>Lowest</option>
                <option>Highest</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
