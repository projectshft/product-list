import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory, sortPrice, searchProduct } from "../redux/actions";
import ProductsListing from "./ProductsListing";
import "./Categories.css";

const Categories = () => {
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [input, setInput] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();

  // Search
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (input && category && price) {
      dispatch(searchProduct(input));
      dispatch(updateCategory(category));
      dispatch(sortPrice(price));
      setQuery(input);
    }
  };

  // Category
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };

  // Price
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <div className="searchbar">
        <form className="query-form" onSubmit={handleInputSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Search for a product"
          />
          <select value={category} onChange={handleCategoryChange}>
            <option value="">Category</option>
            <option value="Beauty">Beauty</option>
            <option value="Books">Books</option>
            <option value="Computers">Computers</option>
            <option value="Electronics">Electronics</option>
            <option value="Food">Food</option>
            <option value="Games">Games</option>
            <option value="Garden">Garden</option>
            <option value="Grocery">Grocery</option>
            <option value="Health">Health</option>
            <option value="Home">Home</option>
            <option value="Industrial">Industrial</option>
            <option value="Movies">Movies</option>
            <option value="Outdoors">Outdoors</option>
            <option value="Shoes">Shoes</option>
            <option value="Sports">Sports</option>
            <option value="Tools">Tools</option>
          </select>
          <select value={price} onChange={handlePriceChange}>
            <option value="">Sort by Price</option>
            <option value="lowest">Lowest to Highest</option>
            <option value="highest">Highest to Lowest</option>
          </select>

          <button type="submit">Search</button>
        </form>
      </div>

      <ProductsListing />
    </div>
  );
};

export default Categories;
