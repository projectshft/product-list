import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/actions';
import axios from 'axios'


const SearchBar = () => {
  
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm ] = useState('')
  const [category, setCategory ]= useState('')
  const [priceSort, setPriceSort]= useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const searchObj = { searchTerm, category, priceSort}
    
    dispatch(getProducts(searchObj))
    
  }

  return (
    <div>
      <div className='search-bar-element'>
        <form onSubmit={handleSubmit} className="searchbar form-group">
          <label>Search for a thing!
            <input
              type="text"
              id='search'
              className="form-control"
              name="search"
              placeholder='Soft'
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              />
          </label>
          <label>Filter by category
            <input
              type="text"
              id='category'
              className="form-control"
              name="category"
              placeholder="computers"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              />
            </label>
            <label>
              <select value={priceSort} onChange={(e) => setPriceSort(e.target.value)}>
                <option value="">Sort by price</option>
                <option value="highest">Highest to lowest</option>
                <option value="lowest">Lowest to highest</option>
              </select>
            </label>
            <button value="submit" type="submit" className="search-button">Click!</button>
        </form>
      </div>
    </div>
  )
}

export default SearchBar