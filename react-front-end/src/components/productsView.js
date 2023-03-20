import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions';

const ProductsView = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {console.log(products)}
      {Array.isArray(products) && products.length > 0 ? (
        products.map((product) => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default ProductsView;
