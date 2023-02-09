import React from 'react'
import { useSelector } from 'react-redux'
import './Categories.css';

const ProductsByCategory = () => {
  const categories = useSelector((state) => state.category.products)
  console.log(categories)

  return (

  <div className="product-wrapper">
    {categories?.map((product, idx) => {
      return (
        <div className="product-container">
          <div key={idx} className="product-card">
            <div className="product-top-label">
              <p className="product-item">
                Category: {product.category}</p>
              <p className="product-price">{product.price}</p>
            </div>
            <div className="product-image">
              <p className="image-text">Product Image</p>
            </div>  
            <h4 className="product-name">{product.name}</h4>
          </div> 
        </div>
      )
    })}
  </div> 
  )
}

export default ProductsByCategory