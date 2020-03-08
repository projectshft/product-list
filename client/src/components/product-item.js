import React from 'react';

import './styles.scss';

const ProductItem = ({ _id, category, name, price, image}) => (
    <div className='col collection-item' key={_id}>
        <div className='row '>
            <h4 className='title'>{category.toUpperCase()}</h4>
            <div className='image'>
                <img src="https://via.placeholder.com/250"></img>
            </div>
        </div>
        <div className='row collection-footer'>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
        </div>
    </div>
)

export default ProductItem;
