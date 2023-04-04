import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar";
import { fetchProducts } from "../actions/products";
import ProductInfo from './ProductInfo';

// ProductList component
const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("")
  const [page, setPage] = useState(0);
  const items = 9;

  useEffect(() => {
    dispatch(fetchProducts(search, category, price));
  }, [dispatch, search, category, price]);

  const refreshProducts = () => {
    setSearch("");
    setCategory("");
    setPrice("");
  };

  return (
    <div>
      <NavBar 
      onSearch={(e) => setSearch(e)} 
      onCategory={(e) => setCategory(e)}
      onPrice={(e) => setPrice(e)}
      onRefresh={refreshProducts}
      />

      <ProductInfo 
      products={products}
       />
    </div>
  )
};

export default Home;
