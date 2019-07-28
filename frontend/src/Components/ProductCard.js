import React from 'react';
import '../CSS/productCard.css';

//TODO - figure out how to align category to bottom of header

const ProductCard = ({ product }) => (
  <div className='col-md-4 mt-5'>
    <div className='card'>
      <div className='card-header'>
        <span>Category: {product.category}</span>
        <span className='price float-right'>${product.price}</span>
      </div>
      <div className='card-body'>
        <img src={product.image} className='card-img' alt={product.name} />
        <h5 className='card-title text-center mt-3'>{product.name}</h5>
      </div>
    </div>
  </div>
);

export default ProductCard;