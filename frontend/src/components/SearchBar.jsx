import { useGetCategoriesQuery } from "../services/products";
import { Link } from "react-router-dom";

const SearchBar = ({ onSearchChange }) => {

  return (
    <div className="fixed py-5 top-0 flex justify-center items-center bg-white w-screen border-b drop-shadow-sm">
      <div className="w-1/2 flex justify-center items-center">
        <input className="border pl-4 w-full" onChange={(e) => onSearchChange(e)} type="text" placeholder="search..."></input>
      </div>
      <div className="px-5">
          <Link className="px-2 py-1 bg-green-400 border" to="/new-product">+ Create New Product</Link>
        </div>
    </div>

  )
}

export default SearchBar;