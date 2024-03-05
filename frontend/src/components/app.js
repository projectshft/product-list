import { Dropdown } from "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../slices/searchSlice";
import { setCategory } from "../slices/categoryFilterSlice";
import { setPrice } from "../slices/priceFilterSlice";
import ProductsComponent from "./productCard";
import CategoryDropdown from "./categoryFilter";
import SearchBar from "./searchBar";
import PriceDropdown from "./priceFilter";


function App() {

  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm)
  const selectedCategory = useSelector((state) => state.categoryFilter)
  const selectedPrice = useSelector((state) => state.priceFilter)


  //Handle category selection
  const handleCategorySelect = (category) => {

    dispatch(setCategory(category))
  };
  //Handle Price filter selection
  const handlePriceSelect = (price) => {

    dispatch(setPrice(price))
  };
  //Handle users search input 
  const onSearch = (term) => {

    dispatch(setSearchTerm(term))
  };
  //Connecting and logging that the server has been connected 
  useEffect(() => {

    fetch('http://localhost:8000/api/data')
      .then(response => response.json())
      .then(data => {
        console.log('Server says:', data.message)
      })
  }, []);


  return (

    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="row w-100">
            <div className="col-6 col-md-7 col-lg-8">
              <SearchBar onSearch={onSearch} />
            </div>
            <div className="col-3 col-md-3 col-lg-2 me-0">
              <CategoryDropdown onSelect={(handleCategorySelect)} />
            </div>
            <div className="col-3 col-md-2 col-lg-2 ms-0">
              <PriceDropdown onSelect={(handlePriceSelect)} />
            </div>
          </div>
        </div>
      </nav>
      <ProductsComponent searchTerm={searchTerm} category={selectedCategory} price={selectedPrice} />
      <div className="d-flex justify-content-center">
      </div>
    </>
  );
};

export default App;