import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "./SearchBarStyles.css";
import { getProducts } from "../redux/counter";
import ProductView from "./ProductView";

function SearchBar() {
  // const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [price, setPrice] = useState("");
  const [query, setQuery] = useState("");

  const url = `http://localhost:8000/products?page=${page}&category=${category}&price=${price}&query=${query}`;

  const resetPage = () => {
    setPage(1);
  };

  const handlePageChange = (e) => {
    setPage(e.target.value);
  };

  const setPageChange = (value) => {
    setPage(value);
  };

  const handleQuery = (e) => {
    e.preventDefault();
    setQuery(searchTerm);
  };

  const handleCategoryChange = (e) => {
    resetPage();
    setCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    dispatch(getProducts(url));
  });

  return (
    <div className="search-style">
      <form onSubmit={handleQuery}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Search..."
        />
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Sort by Category</option>
          <option value="tools">Tools</option>
          <option value="beauty">Beauty</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="health">Health</option>
          <option value="movies">Movies</option>
          <option value="sports">Sports</option>
          <option value="industrial">Industrial</option>
          <option value="kids">Kids</option>
          <option value="grocery">Grocery</option>
          <option value="toys">Toys</option>
          <option value="games">Games</option>
        </select>
        <select value={price} onChange={handlePriceChange}>
          <option value="null">Sort by Price</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
        <select value={page} onChange={handlePageChange}>
          <option value="null">Pages</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
        </select>
      </form>
      <ProductView setPageChange={setPageChange} />
    </div>
  );
}

export default SearchBar;
