
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../slices/searchSlice";
import { setCategory } from "../slices/categoryFilterSlice";
import { setPrice } from "../slices/priceFilterSlice";
import ProductsComponent from "./productCard";
import CategoryDropdown from "./categoryFilter";
import SearchBar from "./searchBar";
import PriceDropdown from "./priceFilter";

// import "./App.css";


function App() {

  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.searchTerm)
  const selectedCategory = useSelector((state) => state.categoryFilter)
  const selectedPrice = useSelector((state) => state.priceFilter)
  const [data, setData] = useState('');



  const handleCategorySelect = (category) => {
    dispatch(setCategory(category))
    console.log('Selected category:', category)
  };

  const handlePriceSelect = (price) => {
    dispatch(setPrice(price))
    console.log('Selected Price:', price)
  };

  const onSearch = (term) => {
    dispatch(setSearchTerm(term))

  };

  useEffect(() => {
    fetch('http://localhost:8000/api/data')
      .then(response => response.json())
      .then(data => setData(data.message))
      .catch(error => console.error('error fetching data:', error))
  }, [])


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="row w-100">
            <div className="col-8 col-md-9 col-lg-10">
              <SearchBar onSearch={onSearch} />
            </div>
            <div className="col-2 col-md-2 col-lg-1">
              <CategoryDropdown onSelect={(handleCategorySelect)} />
            </div>
            <div className="col-2 col-md-2 col-lg-1">
              <PriceDropdown onSelect={(handlePriceSelect)} />
            </div>
          </div>
        </div>
      </nav>
      <div><p>Router says:{data}</p></div>
      <ProductsComponent searchTerm={searchTerm} category={selectedCategory} price={selectedPrice} />
      <div className="d-flex justify-content-center">
      </div>

    </>
  );
};

export default App;