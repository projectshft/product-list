import { useGetCategoriesQuery } from "../services/products";

const SearchBar = ({ onSearchChange }) => {

  return (
<div className="fixed py-5 top-0 flex justify-center items-center bg-white w-screen border-b drop-shadow-sm">
  <div className="w-1/2 flex justify-center items-center">
    <input className="border pl-4 w-full" onChange={(e) => onSearchChange(e)} type="text" placeholder="search..."></input>
  </div>

</div>

  )
}

export default SearchBar;