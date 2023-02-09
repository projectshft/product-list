import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BiSearch } from 'react-icons/bi'
import { getProducts } from '../redux/actions'

const Searchbar = () => {
  const [input, setInput] = useState('')
  // const query = useSelector(state => state.query)
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    console.log('Searching database for', input)
    e.preventDefault();
    dispatch(getProducts(input));
  }

  return (
    <div className="searchbar">
      <div className="input-fied">
        <input 
          type="text" 
          className="search" 
          placeholder="Enter a product name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
          <button  
            className="search-icon" 
            size={10}  
            onClick={handleSubmit}><BiSearch/>
          </button>
        </div>
      </div>
    )
  }

export default Searchbar;