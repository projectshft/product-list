//Display info for 1 product

import React from 'react';

const ProductCard = ({product}) => {
    
    return (

        <div className="col-md-4">
            <div className="card" key={product['_id']["$oid"]}>
                <div className="card mb-4 shadow-sm">
                    <h6 className="card-header">
                        Category: 
                            <small>{`  product['category']         `}</small>
                        Price:  
                            <small>{`      $ product['price']['$numberInt'] `}</small>
                    </h6>
                </div>

                <img className="card-img-top" src={product['image']} alt="Product" />

                <div className="card-body">
                    <p className="card-text">{product['name']}</p>
                </div>
            </div>
        </div>
    )
}


export default ProductCard