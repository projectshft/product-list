import React from 'react'
import { useState } from 'react'
import './Dropdown.css';
import axios from 'axios';
import { getProducts } from '../redux/actions';

const Dropdown = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  // Handle Page Pagination
  const handlePrevious = () => {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    })
  } 
  
  const handleNext = () => {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    })
  }

  return (
    <div>
      <div className="container">        
        <div className="dropdown-1">
          <select className="menu-1" onChange={(e) => { 
            console.log('Get ' + e.target.value + ' products') }}>
            <option>Garden</option>           
            <option>Movies</option>           
            <option>Home</option>         
            <option>Industrial</option>
          </select> 
        </div>

        <div className="dropdown-2">
          <select className="menu-2" onChange={(e) => {
            console.log('Sort ' + e.target.value)}}> 
            <option>Lowest to Highest</option>
            <option>Highest to Lowest</option>
          </select> 
        </div>
      </div>

    {/* Return Data */}

      <div className="results">
        <h2>Results</h2>
        <div className="results-container">{data.map((product) => {
          return (
            <div className="product-card">
              <div className="product-top-label">
                <p className="product-item">Category: {product.category}</p>
                <p className="product-price">{product.price}</p>
              </div>
              <div className="product-image">{product.image}</div>  
              <h4 className="product-name">{product.name}</h4>
            </div>
          )
        })}

      </div>
    </div>

      <footer>
        <button disabled={page === 1} onClick={handlePrevious}>Previous</button>
        <button disabled={page === pageCount} onClick={handleNext}>Next</button>
      </footer>

      </div>
    )
  } 

export default Dropdown