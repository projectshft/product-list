import React, { Component } from "react";

function Product(product) {
  console.log(product)
  return (
    <div className='card shadow p-3 mb-5 bg-white rounded text-center'>
    <div className='card-body'>
      <h5 className='card-title'>{product.product.name}</h5>
      {/* <p className='card-text'>{product.price}</p> */}
    </div>
  </div>
  );
}

export default Product;