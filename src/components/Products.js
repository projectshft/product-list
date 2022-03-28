/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'react-bootstrap';

import ProductCard from './ProductCard';
import { fetchProducts } from '../actions';

const Products = () => {
  const products = useSelector((state) => state.products.products);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts()).then(() => {
      setLoading(false);
    });
  }, [fetchProducts]);

  const renderProducts = () => {
    // while promise is pending
    if (loading) {
      return <h1 className="text-center">Loading...</h1>;
    }
    // once products return
    if (products.length) {
      return products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ));
    }
    // if products is empty
    return <h1>No products</h1>;
  };

  return <Row className="g-5">{renderProducts()}</Row>;
};

export default Products;
