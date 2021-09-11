import { useState } from "react";
import { useDispatch } from "react-redux"
import { fetchProducts } from "../actions";

function SearchBar() {
const dispatch = useDispatch();
const [search, setSearch] = useState();
const [price, setPrice] = useState();

const handleSearchChange = (e) => {
  setSearch(e.target.value)
  if (e.keyCode === 13) {
    handleSearch()
  }
}

const handleSearch = () => {
  dispatch(fetchProducts(search, price))
}

const handleCategoryChange = () => {

}

const handlePriceSort = (e) => {
  setPrice(e.target.value)
  handleSearch()
}
  return (
  <div className='row'>
    <div className='col-md-6 offset-md-1'>
      <div className='input-group'>
        <input type='text' className='form-control' placeholder='Product Search' onKeyUp={handleSearchChange}></input>
      </div>
    </div>
    <div className='col-md-2'> 
      <select className="form-control" name="category" onChange={handleCategoryChange} >
        <option>Sort by Category</option>
        <option value="Automotive">Automotive</option>
        <option value="Clothing">Clothing</option>
        <option value="Kids">Kids</option>
        <option value="Home">Home</option>
        <option value="Games">Games</option>
        <option value="Sports">Sports</option>         
      </select>
    </div>
    <div className='col-md-2'> 
      <select className="form-control" name="price" onChange={handlePriceSort} >
        <option>Sort by Price</option>
        <option value="highest">Highest</option>
        <option value="lowest">Lowest</option>         
      </select>
    </div>
  </div>
)
}

export default SearchBar