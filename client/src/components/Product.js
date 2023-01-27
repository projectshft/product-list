import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ category, name, price, image }) => {

  return (
    <div className="product-card">
      <div className="product-row">
        <p>{category}</p>
        <p>{price}</p>
      </div>

      <img src={image} alt={name}/>
      <h4>{name}</h4>

    </div>
  )
}

export default Product


