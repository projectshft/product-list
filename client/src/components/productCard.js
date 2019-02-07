//Display info for 1 product

import React from 'react';

const ProductCard = ({product}) => {
    
    return (

        <div className="col-md-4">
            <div className="card" key={product['_id']}>
                <div className="card mb-4 shadow-sm">
                    <div className="card-header d-flex justify-content-between">
                        <p>Category: {`  ${product['category']}`}</p> 
                        <h4>{`$ ${product['price']}`}</h4>
                    </div>
                </div>

                <img className="card-img-top" src={product['image']} alt="Product" />

                <div className="card-body">
                    <h3 className="card-text">{product['name']}</h3>
                </div>
            </div>
        </div>
    )
}


export default ProductCard