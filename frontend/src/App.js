import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./actions/index";
import Pagination from "./components/pagination";
import Products from "./components/products";

const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const resetPage = () => {
    setPage(1);
  }

  const resetSearch = () => {
    setQuery("");
    setQuery("");
  }

  // Searching based on query input
  const handleQuerySubmit = (e) => {
    e.preventDefault();
    resetPage();
    setQuery(query);
    resetSearch();
    dispatch(fetchProducts(page, query, category, price));
  }

  const handleInputChange = (e) => {
    e.preventDefault()
    resetPage();
    resetSearch();
    setQuery(e.target.value);
  }

  // search based on category sort
  const handleCategorySelect = (e) => {
    resetPage();
    setCategory(e.currentTarget.value)
    resetSearch();
    dispatch(fetchProducts(page, query, e.currentTarget.value, price));
  }
  
  // search based on price sort 
  const handlePriceSelect = (e) => {
    e.preventDefault()
    resetPage();
    setPrice(e.currentTarget.value)
    resetSearch();
    dispatch(fetchProducts(page, query, category, e.currentTarget.value));
  }

  // setup pagination
  const handlePageChange = (page) => {
    setPage(page);
    dispatch(fetchProducts(page, query, category, price));
  }

  return (
    <div className="App">
      <div className="container-fluid">
      <div className="SearchNav container d-flex mb-5 pt-3">
        <div className="leftSide flex-grow-1">
            <form onSubmit={handleQuerySubmit}>
              <div className="input-group">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search"
                  onChange={handleInputChange}
                  />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="submit">Search</button>
                </div>
              </div>
            </form>
        </div>

        <div className="rightSide col-4 d-flex ms-5">
          <div className="col input-group">
            <div className="input-group-append">
              <select className='form-select' defaultValue="Sort By Category" onChange={handleCategorySelect}>
                <option>Sort By Category</option>
                <option>Automotive</option>
                <option>Baby</option>
                <option>Beauty</option>
                <option>Books</option>
                <option>Clothing</option>
                <option>Computers</option>
                <option>Electronics</option>
                <option>Games</option>
                <option>Garden</option>
                <option>Grocery</option>
                <option>Home</option>
                <option>Industrial</option>
                <option>Jewelery</option>
                <option>Kids</option>
                <option>Movies</option>
                <option>Music</option>
                <option>Outdoors</option>
                <option>Shoes</option>
                <option>Sports</option>
                <option>Tools</option>
                <option>Toys</option>
              </select>
            </div>
          </div>
          
          <div className="col input-group d-flex">
            <div className="input-group-append">
              <select className='form-select' defaultValue="Sort By Price" onChange={handlePriceSelect}>
                <option>Sort By Price</option>
                <option>Highest</option>
                <option>Lowest</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
      <Products />
      <Pagination onChange={handlePageChange} page={page} />
    </div>
  );
};

// export default SearchNav;
export default App;
