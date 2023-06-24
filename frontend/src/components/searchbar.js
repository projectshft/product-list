import { useDispatch } from "react-redux";
import { useForm } from 'react-hook-form';
import { fetchProducts } from "../actions";
import { useState } from "react";
import { useEffect } from "react";



const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [page, setPage] = useState("");


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(page, query, category, price));
  }, [page, query, category, price]);

  const handleQuerySubmit = e => {
    if (e.key === "Enter") {
      setQuery(e.currentTarget.value);
    };
  };

  const handleCatSelect = e => {
    if (e.currentTarget.value !== "Sort By Category") {
      setCategory(e.currentTarget.value);
    } else {
      setCategory("");
    };
  };

  const handlePriceSelect = e => {
    if (e.currentTarget.value === "Sort By Price") {
      setPrice("");
    } else if (e.currentTarget.value === "Highest to Lowest") {
      setPrice("highest");
    } else if (e.currentTarget.value === "Lowest to Highest") {
      setPrice("lowest");
    } else {
      console.log("Something went wrong while setting the price sort.")
    };    
  };

  return (
    <form className='container row'>
      <div className='form-group'>
        <label className='form-label'>Search Products</label>
      </div>
      <div className='mb-3 row'>
        <div className='col-md-6'>
          <input className='form-control' type='text' placeholder='Search' onKeyUp={handleQuerySubmit}></input>
        </div>
        <div className='col-md-3'>
          <select className='form-select' onChange={handleCatSelect}>
            <option selected>Sort By Category</option>
            <option>Automotive</option>
            <option>Baby</option>
            <option>Beauty</option>
            <option>Clothing</option>
            <option>Computers</option>
            <option>Electronics</option>
            <option>Games</option>
            <option>Garden</option>
            <option>Grocery</option>
            <option>Health</option>
            <option>Jewelery</option>
            <option>Kids</option>
            <option>Movies</option>
            <option>Music</option>
            <option>Shoes</option>
            <option>Sports</option>
            <option>Tools</option>
            <option>Toys</option>
            <option>Outdoors</option>
          </select>
        </div>
        <div className='col-md-3'>
          <select className='form-select' onChange={handlePriceSelect}>
            <option selected>Sort By Price</option>
            <option>Highest to Lowest</option>
            <option>Lowest to Highest</option>
          </select>
        </div>
      </div>
      <hr />
    </form>
  );
};

export default SearchBar;