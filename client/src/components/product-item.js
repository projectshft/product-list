import React from 'react';

import './styles.scss';

const ProductItem = ({ _id, category, name, price, image}) => (
    <div className='col col-md-4 collection-item' key={_id}>
        <div className='row '>
            <div className='title' id="catTitle">Category: {category.toUpperCase()}</div>
            <div className='image'>
                <img src="https://via.placeholder.com/300x250"></img>
            </div>
        </div>
        <div className='row collection-footer'>
            <span className='name'>{name}</span>
            <span className='price'>${price}</span>
        </div>
    </div>
)

export default ProductItem;
