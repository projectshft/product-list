import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { fetchCategories } from "../actions";
const queryString = require('query-string');

const SearchBar = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const defaultSearchOptions = {query: '', category: '', price: ''}
  const {query, category, price} = {...defaultSearchOptions, ...queryString.parse(location.search)}
  const categories = useSelector(({categories}) => categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [])

  const generateCategoryOptions = (categoryArray) => {
    return categoryArray.map((category) => <option value={category}>{category}</option>)
  }

  // Creates the new url with new search options
  const createUpdatedLocation = (currentLocation, searchUpdate) => {
    const currentSearch = queryString.parse(currentLocation.search);
    //Note: The page needs to be reset on a new search
    const newSearch = {...currentSearch, ...searchUpdate, page: ''};
    const updatedLocation = {...location, search: queryString.stringify(newSearch, {skipEmptyString: true})};
    return updatedLocation;
  }

  const handleSearchInput = (e) => {
    history.push(createUpdatedLocation(location, {query: e.target.value}))
  }
  const handleCategorySelection = (e) => {
    history.push(createUpdatedLocation(location, {category: e.target.value}));
  }
  const handlePriceSortSelection = (e) => {
    history.push(createUpdatedLocation(location, {price: e.target.value}));
  }

  return (
    <div className="row mt-3 mb-5">
      <div className="col-md-6">
        <input type="text" className="form-control" placeholder="Search..." onChange={handleSearchInput} value={query}/>
      </div>
      <div className="col-md-3">
        <select className="form-select" onChange={handleCategorySelection} value={category}>
          <option value = ''>Filter Results By Category...</option>
          {generateCategoryOptions(categories)}
        </select>
      </div>
      <div className="col-md-3">
        <select className="form-select" onChange={handlePriceSortSelection} value={price}>
          <option value = ''>Sort By Price...</option>
          <option value="lowest">Low to High</option>
          <option value="highest">High to Low</option>
        </select>
      </div>
    </div>
  )
}

export default SearchBar;