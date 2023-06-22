import React from 'react'
import { useSelector } from 'react-redux'
import './ProductsListing.css'

const ProductsListing = () => {
  const products = useSelector((state) => state.filterItems.products)
    return (    
      <div className="product-container">
        {products?.map((product, idx) => {
          return (
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
          )
        })}
      </div> 
    );
  }

export default ProductsListing;

