import React from 'react';

const Product = ({product}) => {
    return (
        <div className="container-md offset-3">
            <span>{product.category}  {product.price}</span>
            <span>{product.image}</span>
            <span>{product.name}</span>
        </div>
        
    )
}

export default Product