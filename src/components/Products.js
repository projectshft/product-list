/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Table } from 'react-bootstrap';

// import ProductCard from './ProductCard';
import { fetchProducts } from '../actions';

const Products = () => {
  const products = useSelector((state) => state.products);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts()).then(() => {
      setLoading(false);
    });
  }, [fetchProducts]);

  const renderProducts = () => {
    if (loading) {
      return <h1>Loading...</h1>;
    }
    if (products.length) {
      return <div>{products[0].name}</div>;
    }
    return <h1>No products</h1>;
  };

  return <div>{renderProducts()}</div>;
};

export default Products;
