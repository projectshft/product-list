import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchProducts } from "./actions";
import { useDispatch } from "react-redux";
import ProductData from "./components/productData";
import Pagination from "./components/pagination";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const categories = useSelector((state) => state.productData.categories);

  console.log("categories", categories);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(searchTerm, category, sort, page));
  }, [searchTerm, category, sort, page, dispatch]);

  const handleProductSearch = (e) => {
    e.preventDefault();
    dispatch(fetchProducts(searchTerm, category, sort, page));
  };

  return (
    <div className="App">
      <h1 className="text-muted display-1 header">Anazon</h1>
      <div className="customerInput">
        <form onSubmit={(e) => handleProductSearch(e)}>
          <div className="searchBar">
            <input
              className="form-control input-bar"
              placeholder="Enter search term"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            ></input>
            <button className="btn btn-primary col-auto" type="submit">
              Submit
            </button>
          </div>
        </form>

        <div className="category">
          <select
            className="form-control"
            defaultValue={category}
            name="category"
            id="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {/* Need to write a function to pull out categories */}
            <option selected="defaultValue">Select a Category ▼</option>
            <option value="">All Categories</option>
            <option value="Automotive">Automotive</option>
            <option value="Baby">Baby</option>
            <option value="Beauty">Beauty</option>
            <option value="Books">Books</option>
            <option value="Clothing">Clothing</option>
            <option value="Computers">Computers</option>
            <option value="Electronics">Electronics</option>
            <option value="Games">Games</option>
            <option value="Garden">Garden</option>
            <option value="Grocery">Grocery</option>
            <option value="Health">Health</option>
            <option value="Home">Home</option>
            <option value="Industrial">Industrial</option>
            <option value="Jewelery">Jewelery</option>
            <option value="Kids">Kids</option>
            <option value="Movies">Movies</option>
            <option value="Music">Music</option>
            <option value="Outdoors">Outdoors</option>
            <option value="Shoes">Shoes</option>
            <option value="Sports">Sports</option>
            <option value="Tools">Tools</option>
            <option value="Toys">Toys</option>
          </select>
        </div>
        <div className="sort">
          <select
            className="form-control"
            name="sort"
            id="sort"
            placeholder="Sort by Price"
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option selected="defaultValue">Sort by ▼</option>
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
          </select>
        </div>
      </div>
      <div className="products">
        <ProductData />
      </div>
      <div className="pagination">
        <Pagination />
      </div>
    </div>
  );
}

export default App;
