'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from './ProductCard';
import { fetchProducts } from '../store/slices/products';

export function ProductContainer() {
  const dispatch = useDispatch();
  const products = useSelector(
    (state) => state.products.results.resultsLimited,
  );
  const productsStatus = useSelector((state) => state.products.status);
  const [prodArr, setProdArr] = useState([]);

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsStatus]);

  useEffect(() => {
    if (products?.length > 0) {
      setProdArr([...products]);
    }
  }, [products]);

  // console.log({products});
  // console.log({productsStatus});
  // console.log({ prodArr });

  return (
    <div className="album">
      <div className="container">
        <div className="row row-cols-md-3">
          {prodArr.map((product) => (
            <ProductCard
              key={product._id}
              name={product.name}
              category={product.category}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}