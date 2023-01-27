import React from 'react'

const Searchbar = () => {
  return (
    <main>
      <input 
        className="searchbar"
        type="search"
        placeholder="Search"> 
      </input>
  
      <input 
        className="category"
        type="search"
        placeholder="Sort by Category">
      </input>

      <input 
        className="price"
        type="search"
        placeholder="Sort by Price">
      </input>
    </main>
  )
}

export default Searchbar