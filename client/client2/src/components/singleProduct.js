import React from 'react'

const Product = (props) => {
  let product = props.productItemAsProps
  console.log(product.image)
  return (
    
  <div className="col-md-4">
    <div className="productCard">
      <h1>{product.name}</h1><h2>${product.price}</h2>
        <img src={product.image} />
      <p>{product.description}</p>
    </div>
  </div>
  )
}

export default Product
