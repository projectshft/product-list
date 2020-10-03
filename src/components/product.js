import React, { Component } from 'react';

const Product = ({product}) => {
    return (
        <div>
            <span>{product.category}  {product.price}</span>
            <span>{product.image}</span>
            <span>{product.name}</span>
        </div>
        
    )
}

export default Product