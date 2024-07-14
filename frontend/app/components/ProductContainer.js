'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from './ProductCard';
import { fetchProducts } from '../store/slices/products';

export function ProductContainer() {
  const dispatch = useDispatch();
  const resultsLimited = useSelector((state) => state.products.resultsLimited);
  const productsStatus = useSelector((state) => state.products.status);
  const [prodArr, setProdArr] = useState([]);

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, productsStatus]);

  useEffect(() => {
    if (resultsLimited?.length > 0) {
      setProdArr([...resultsLimited]);
    }
  }, [resultsLimited]);

  return (
    <div className="album">
      <div className="container">
        <div className="row row-cols-xl-3">
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
