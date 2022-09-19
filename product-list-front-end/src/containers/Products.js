// import { useState } from 'react';
// import { useDispatch } from 'react-redux/es/exports';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import Product from '../components/Product';

export default function Products() {
  // const dispatch = useDispatch();
  const productsData = useSelector(({ products }) => products.data);

  function renderProducts() {
    const products = productsData.docs.map((product) => (
      <Product
        price={product.price}
        name={product.name}
        category={product.category}
        imageUrl={product.image}
        key={product._id}
      />
    ));

    return products.length > 0 ? (
      products
    ) : (
      <div>No products found for current search query</div>
    );
  }
  return _.isEmpty(productsData) ? (
    <div>Loading...</div>
  ) : (
    <div className="row row-cols-1 row-cols-md-3 g-4 col-xl-8 offset-xl-2 products">
      {renderProducts()}
    </div>
  );
}
