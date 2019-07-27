import React from 'react';

const ProductCard = ({ product }) => (
  <div className='card col-md-4'>
    <div className='card-body'>
      <h5 className='card-title'>{product.name}</h5>
      <img src={product.image} className='card-img' alt={product.name} />
    </div>
  </div>
);

export default ProductCard;