'use client';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/productsSlice";
import Pagination from "./Pagination";
import SortPrice from "./SortPrice";
import SearchBar from "./SearchBar";
import "../styles.css";
import SortCategory from "./SortCategory";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const count = useSelector((state) => state.products.count);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [sortCategory, setSortCategory] = useState("");


  /**
   * Number of products displayed per page and math for amount of pages displayed at bottom of each page
   */
  const productsPerPage = 9;
  const totalPages = Math.ceil(count / productsPerPage);

  /**
   * Fetches products/updates products when page, search, price or category changes
   */
  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, searchQuery, sortPrice, sortCategory }));
  }, [dispatch, currentPage, searchQuery, sortPrice, sortCategory]);

  /**
   * Handles page change
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  /**
   * Handles price sorting
   */
  const handleSortPriceChange = (selectedSortPrice) => {
    setSortPrice(selectedSortPrice);
    dispatch(fetchProducts({ page: currentPage, searchQuery, sortPrice: selectedSortPrice, sortCategory }));
  };

  /**
   * Handles category sorting
   */  
  const handleSortCategoryChange = (selectedSortCategory) => {
    setSortCategory(selectedSortCategory);
    dispatch(fetchProducts({ page: currentPage, searchQuery, sortCategory: selectedSortCategory, sortPrice }));
  }

  /**
   * Renders the page with search bar, sorting price/category options, product list and pagination
   */
  return (
    <div className="container text-center">
      <div className="search-sort-container">
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="sort-dropdowns">
          <SortPrice onSortPriceChange={handleSortPriceChange} />
          <SortCategory onSortCategoryChange={handleSortCategoryChange} />
        </div>
      </div>
      <div className="row justify-content-center">
        {products.map((product) => (
          <div key={product._id} className="col-md-4 product product-border">
            <p>Category: <strong>{product.category}</strong></p>
            <img src={product.image} alt={product.name} />
            <p><strong>{product.name}</strong></p>
            <p>Price: <strong>{product.price}</strong></p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Products;
