// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchProducts, fetchFirst } from "../actions/fetchProducts";
import { useEffect } from "react";
import { CategoryItems } from "./CategoryItems";

//to-do: account for pagination
//simplified functions for fetching products by optional parameters...passing three values rather than sending as an object and all that unnecessary work
const SearchProducts = ({
  price,
  setPrice,
  category,
  setCategory,
  query,
  setQuery,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFirst());
  }, [dispatch]);

  const handlePrice = (event) => {
    setPrice(event.target.value);
    dispatch(fetchProducts(event.target.value, category, query));
  };
  
  const handleCategory = (event) => {
    setCategory(event.target.value);
    dispatch(fetchProducts(price, event.target.value, query));
  };
  
  
  const handleQuery = (event) => {
    setQuery(event.target.value);
    dispatch(fetchProducts(price, category, event.target.value));
  };

  return (
    <div className="input-group mb-8">
      <input
        type="text"
        className="form-control"
        placeholder="Search for a product"
        onChange={handleQuery}
      />
      <select name="category" id="category-select" onChange={handleCategory}>
        <option value="">Filter by Category</option>
        {CategoryItems.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
      <select name="price" id="price-select" onChange={handlePrice}>
        <option value="">Filter by Price</option>
        <option value="lowest">Lowest to Highest</option>
        <option value="highest">Highest to Lowest</option>
      </select>
    </div>
  );
};

export default SearchProducts;


