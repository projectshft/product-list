import React from 'react'
import {Link} from 'react-router-dom'

const Product = (props) => {
  let product = props.productItemAsProps
  console.log(product.image)
  return (
    
  <div className="col-md-4">
    <div className="productCard" data-id={product._id}>
      <h1>{product.name}</h1><h2>${product.price}</h2>
        <img src={product.image} />
      <p>{product.description}</p>
      <Link to={`/products/${product._id}/reviews`}>Reviews</Link>
    </div>
  </div>
  )
}

export default Product
