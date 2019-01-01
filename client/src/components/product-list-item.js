import React from 'react';

//this is a stateless component that takes an individual product from
//the products array (passed down from App.js to product-list.js as props)
//and renders an image of the product
const ProductListItem = ({product}) => {
  let category = product.category.charAt(0).toUpperCase() + product.category.slice(1);

  return (
    <div className="col-md-4" id={product._id}>
      <span className="category-display">Category: {category}</span>
      <span className='price-display'>${product.price}</span>
      <img src={product.image} alt={product.name} className="thumbnail"></img>
      <p className="product-name-display">{product.name}</p>
    </div>
  )
}

export default ProductListItem;