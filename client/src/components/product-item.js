import React from 'react';

import './styles.scss';

const ProductItem = ({ _id, category, name, price, image}) => (
    <div className='collection-item'>
        <h4 className='title'>{category.toUpperCase()}</h4>
        <div
            className='image'
            style={{
                backgroundImage: `url(${image})`
            }}
            ></div>
        <div className='collection-footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
    </div>
)

export default ProductItem;