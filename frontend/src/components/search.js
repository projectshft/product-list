import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getProducts, setSearchQuery, setCategoryFilter, setSortOrder } from "../actions/actions";

const Search = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [priceSort, setPriceSort] = useState('');
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setQuery(e.target.value);
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  }

  const handleSortOrderChange = (e) => {
    setPriceSort(e.target.value);
  }

  const handleSubmit = (e) => {
    dispatch(getProducts(`?query=${query}&category=${category}&price=${priceSort}`));
  
    setQuery('');
    setCategory('');
    setPriceSort('');
    setInputValue('');

    dispatch(setSearchQuery(query))
    dispatch(setCategoryFilter(category))
    dispatch(setSortOrder(priceSort))

    e.preventDefault();
  }

  return (
  <div className="row">
    <div className="col-md-6 offset-md-3 search-bar">
      <form onSubmit = {handleSubmit}>
        <div className="form-group row">
            <div className="col-md-8">
              <input className="form-control list-page-search-bar"
                placeholder="Search product" onChange={handleInputChange} value={inputValue}>
              </input>
            </div>

            <div className="col-md-8">
              <select name="category" onChange={handleCategoryChange} value={category}>
                <option value="">Choose category:</option>
                <option value="toys">Toys</option>
                <option value="sports">Sports</option>
                <option value="movies">Movies</option>
                <option value="music">Music</option>
                <option value="clothing">Clothing</option>
                <option value="industrial">Industrial</option>
                <option value="kids">Kids</option>
                <option value="garden">Garden</option>
                <option value="outdoors">Outdoors</option>
                <option value="electronics">Electronics</option>
                <option value="tools">Tools</option>
                <option value="grocery">Grocery</option>
              </select>
            </div>

            <div className="col-md-8">
              <select name="sort" onChange={handleSortOrderChange} value={priceSort}>
                <option value="">Sort by price:</option>
                <option value="highest">Highest</option>
                <option value="lowest">Lowest</option>
              </select>
            </div>

            <div className="col-md-2">
              <button className="btn btn-primary search-btn" type="submit">Search</button>
            </div>
        </div>
      </form>

      <hr></hr>
      </div>
    </div>
  )
}

export default Search;