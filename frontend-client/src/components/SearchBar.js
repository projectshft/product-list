import { useState } from "react";
import { useHistory, useLocation } from "react-router";
const queryString = require('query-string');

const SearchBar = () => {
  const location = useLocation();
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [priceSort, setPriceSort] = useState('');
  //const searchOptions = useSelector(({searchOptions}) => searchOptions);

  const createUpdatedLocation = (currentLocation, searchUpdate) => {
    const currentSearch = queryString.parse(currentLocation.search);
    //Note: The page needs to be reset on a new search
    const newSearch = {...currentSearch, ...searchUpdate, page: ''};
    const updatedLocation = {...location, search: queryString.stringify(newSearch, {skipEmptyString: true})};
    return updatedLocation;
  }

  const handleSearchInput = (e) => {
    setQuery(e.target.value);
    history.push(createUpdatedLocation(location, {query: e.target.value}))
  }
  const handleCategorySelection = (e) => {
    setCategory(e.target.value);
    history.push(createUpdatedLocation(location, {category: e.target.value}));
  }
  const handlePriceSortSelection = (e) => {
    setPriceSort(e.target.value)
    history.push(createUpdatedLocation(location, {price: e.target.value}));
    // dispatch(setSearchOptions({price: e.target.value}))
  }
  return (
    <div className="row mt-3 mb-5">
      <div className="col-md-6">
        <input type="text" className="form-control" placeholder="Search..." onChange={handleSearchInput} value={query}/>
      </div>
      <div className="col-md-3">
        <select className="form-select" onChange={handleCategorySelection} value={category}>
          <option value = ''>Filter Results By Category...</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Toys">Toys</option>
          <option value="Garden">Garden</option>
        </select>
      </div>
      <div className="col-md-3">
        <select className="form-select" onChange={handlePriceSortSelection} value={priceSort}>
          <option value = ''>Sort By Price...</option>
          <option value="lowest">Low to High</option>
          <option value="highest">High to Low</option>
        </select>
      </div>
    </div>
  )
}

export default SearchBar;