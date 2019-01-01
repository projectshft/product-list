import React from 'react';
import ProductListItem from './product-list-item'

/*this will be a stateless component that receives the products array
as props from the App component*/

const ProductList = ({products}) => {

  const Products = products.map(product => {
    return (
      <ProductListItem key={product._id} product={product}/>
    )
  })
  return (
    <div className="container container-fluid">
     <div className="row" id="list-of-matches">
        { Products }
      </div>
    </div>
  )
}

export default ProductList;