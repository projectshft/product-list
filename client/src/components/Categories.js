import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCategory, sortPrice, searchProduct } from '../redux/actions'
import './Categories.css';
import ProductsListing from './ProductsListing';

const Categories = () => {
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [input, setInput] = useState('');
  const [price, setPrice] = useState('');

  const dispatch = useDispatch();


  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  }

  // Search button
  const handleInputSubmit = (e) => {
    e.preventDefault();
    dispatch(searchProduct(input));
    setQuery(input);
    setInput('');
  };
  
  // --------- Price Dropdown ----------//
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    console.log('Price is: ' + e.target.value);
  }

  // --------- Price button ----------//
  const handlePriceSubmit = (e) => {
    e.preventDefault();
    dispatch(sortPrice(price));
  }

  // --------- Category Dropdown -------//
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    console.log(e.target.value);
  };

  // --------- Category button -------//
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    // is action firing?
    dispatch(updateCategory(category));
  }
 
  return (
    <div>

  {/* ---------- Search form ----------*/}

      <form onSubmit={handleInputSubmit}>
        <input 
          type="text" 
          value={input} 
          onChange={handleInputChange} 
          placeholder="Search for a product"
        />
        <button type="submit">Search</button>
      </form>

  {/* ---------- Category form ----------*/}
      <form>
        <select value={category} onChange={handleCategoryChange} className="menu-1"> 
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
        <button onClick={handleCategorySubmit} type="submit">Search</button>
      </form>


{/* --------- Price Form -------------*/}
      <form>
      <select value={price} onChange={handlePriceChange} className="menu-2">
        <option value="">Sort by Price</option>
        <option value="asc">Lowest to Highest</option>
        <option value="desc">Highest to Lowest</option>
      </select>

      <button onClick={handlePriceSubmit} type="submit">Search</button>
    </form>
       
      <ProductsListing/>

    </div>

    );
  };

export default Categories;