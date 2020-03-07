import React from 'react';

import ProductItem from './product-item';

import './styles.scss';

const ProductsPreview = ({ products }) => (
  <div className='collection-preview'>
    <h1 className='title'>{products.category.toUpperCase()}</h1>
    <div className='preview'>
      {products
        .filter((item, idx) => idx < 4)
        .map(({ _id, ...otherItemProps }) => (
          <ProductItem key={_id} {...otherItemProps} />
        ))}
    </div>
  </div>
);

export default ProductsPreview;