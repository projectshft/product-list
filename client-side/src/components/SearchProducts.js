// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
import React from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../actions/fetchProducts";
import { useEffect } from "react";
import { CategoryItems } from "./CategoryItems";

//to-do: account for pagination
const SearchProducts = ({
  query,
  category,
  price,
  setQuery,
  setCategory,
  setPrice,
}) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, []);

  const handleQuery = (event) => {
    setQuery(event.target.value);
    dispatch(fetchProducts(price, category, event.target.value));
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
    dispatch(fetchProducts(price, event.target.value, query));
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
    dispatch(fetchProducts(event.target.value, category, query));
  };

  return (
    <div className="input-group mb-8">
      <input
        type="text"
        className="form-control"
        placeholder="Search for a product"
        onChange={handleQuery}
      />
      <select name="category" id="select-category" onChange={handleCategory}>
        <option value="">Filter by Category</option>
        {CategoryItems.map((choice, index) => (
          <option key={index} value={choice}>
            {choice}
          </option>
        ))}
      </select>
      <select name="price" id="select-price" onChange={handlePrice}>
        <option value="">Filter by Price</option>
        <option value="lowest">Lowest to Highest</option>
        <option value="highest">Highest to Lowest</option>
      </select>
    </div>
  );
};

export default SearchProducts;
