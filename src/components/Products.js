/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Table } from 'react-bootstrap';

// import ProductCard from './ProductCard';
import { fetchProducts } from '../actions';

const Products = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [fetchProducts]);

  const renderProducts = () => {
    if (products) {
      return <div>{products[0].name}</div>;
    }
    return <h1>No products</h1>;
  };

  return <div>{renderProducts()}</div>;
};

export default Products;
