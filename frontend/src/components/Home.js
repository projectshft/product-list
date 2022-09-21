import React from 'react'
import ProductsGrid from './ProductsGrid'
import SearchBar from './SearchBar'

const Home = () => {
  return (
    <div>
      <SearchBar />
      <ProductsGrid />
    </div>
  )
}

export default Home