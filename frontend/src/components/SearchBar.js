import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getProducts } from '../actions/actions';
import {Button } from 'react-bootstrap'

const SearchBar = () => {
  
  const dispatch = useDispatch()
  const [searchTerm, setSearchTerm ] = useState('')
  const [category, setCategory ]= useState('')
  const [priceSort, setPriceSort]= useState('')
  const [page, setPage] = useState(1)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const searchObj = { searchTerm, category, priceSort, page}
    dispatch(getProducts(searchObj))
  }

  return (
    <div className='search-bar-div'>
      <div className='search-bar-element'>
        <form onSubmit={handleSubmit} className="searchbar form-group">
          <label>Search for a thing!
            <input
              type="text"
              id='search'
              className="searchBarItem form-control"
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
              className="searchBarItem form-control"
              name="category"
              placeholder="computers"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              />
            </label>
            <label>
              <select
                className='form-control searchBarItem' 
                value={priceSort} 
                onChange={(e) => setPriceSort(e.target.value)}>
                <option value="">Sort by price</option>
                <option value="highest">Highest to lowest</option>
                <option value="lowest">Lowest to highest</option>
              </select>
            </label>
            <Button 
              variant='info'
              value="submit" 
              type="submit" className="searchBarItem search-button">Click!</Button>
        </form>
      </div>
    </div>
  )
}

export default SearchBar