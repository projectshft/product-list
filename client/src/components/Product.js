import React, { Component } from "react";
import '../CSS/product.css'

function Product(product) {
  return (
    <div className='card border-dark shadow p-3 mb-5 bg-white rounded text-center'>
      <div className='card-header text-center text-muted'>Category: {product.product.category}</div>
    <div className='card-body'>
      
      <h6 className='card-title'>{product.product.name}</h6>
        <img className='card-img-bottom' src={product.product.image}/>
      <div className='card-footer text-right'>${product.product.price}</div>
   
    </div>
  </div>

  );
}

export default Product;