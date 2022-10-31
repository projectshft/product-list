import React from "react";
import { useDispatch } from "react-redux";
import { fetchProducts, fetchFirst } from "../actions/fetchProducts";
import { useEffect } from "react";
import { CategoryItems } from "./CategoryItems";


//to-do: account for pagination
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
    <div className="input-group mb-8" id="search-bar">
      <input
        type="text"
        className="form-control"
        id="input-search"
        placeholder="Search for a product..."
        onChange={handleQuery}
      />
      <select name="category" id="category-dropdown" onChange={handleCategory}>
        <option value="">Filter by Category</option>
        {CategoryItems.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>
      <select name="price" id="price-dropdown" onChange={handlePrice}>
        <option value="">Filter by Price</option>
        <option value="lowest">Lowest to Highest</option>
        <option value="highest">Highest to Lowest</option>
      </select>
    </div>
  );
};

export default SearchProducts;


