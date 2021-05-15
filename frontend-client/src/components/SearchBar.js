import { useState } from "react";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [priceSort, setPriceSort] = useState('');
  const handleSearchInput = (e) => {
    setQuery(e.target.value);
    debugger
  }
  const handleCategorySelection = (e) => {
    setCategory(e.target.value);
    debugger;
  }
  const handlePriceSortSelection = (e) => {
    setPriceSort(e.target.value)
    debugger;
  }
  return (
    <div className="row mt-3 mb-5">
      <div className="col-md-6">
        <input type="text" className="form-control" placeholder="Search..." onChange={handleSearchInput} value={query}/>
      </div>
      <div className="col-md-3">
        <select className="form-select" onChange={handleCategorySelection} value={category}>
          <option selected>Filter Results By Category...</option>
          <option value="test">Test</option>
        </select>
      </div>
      <div className="col-md-3">
        <select className="form-select" onChange={handlePriceSortSelection} value={priceSort}>
          <option selected>Sort By Price...</option>
          <option value="test">Test</option>
        </select>
      </div>
    </div>
  )
}

export default SearchBar;