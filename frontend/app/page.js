'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from './components/ProductCard';
import { fetchProducts } from './store/slices/products';

export default function Home() {
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
    <main>
      {prodArr.map((product) => (
        <ProductCard
          key={product._id}
          name={product.name}
          category={product.category}
          price={product.price}
          image={product.image}
        />
      ))}
    </main>
  );
}
