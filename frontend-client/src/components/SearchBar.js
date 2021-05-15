import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { fetchProducts } from "../actions";
const queryString = require('query-string');

const SearchBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [priceSort, setPriceSort] = useState('');

  const handleSearchInput = (e) => {
    setQuery(e.target.value);
    debugger
  }
  const handleCategorySelection = (e) => {
    setCategory(e.target.value);
    const searchOptions = queryString.parse(location.search);
    const newSearchOptions = {...searchOptions, category: e.target.value}
    location.search = queryString.stringify(newSearchOptions);
    debugger;
    history.push(location);
  }
  const handlePriceSortSelection = (e) => {
    setPriceSort(e.target.value)
    const searchOptions = queryString.parse(location.search);
    const newSearchOptions = {...searchOptions, price: e.target.value}
    location.search = queryString.stringify(newSearchOptions);
    debugger;
    history.push(location);
  }
  return (
    <div className="row mt-3 mb-5">
      <div className="col-md-6">
        <input type="text" className="form-control" placeholder="Search..." onChange={handleSearchInput} value={query}/>
      </div>
      <div className="col-md-3">
        <select className="form-select" onChange={handleCategorySelection} value={category}>
          <option selected>Filter Results By Category...</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Toys">Toys</option>
          <option value="Garden">Garden</option>
        </select>
      </div>
      <div className="col-md-3">
        <select className="form-select" onChange={handlePriceSortSelection} value={priceSort}>
          <option selected>Sort By Price...</option>
          <option value="lowest">Low to High</option>
          <option value="highest">High to Low</option>
        </select>
      </div>
    </div>
  )
}

export default SearchBar;