import React, { useEffect, useState } from 'react';
import ProductListItem from './ProductListItem';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../app/store/slices/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  

  const loadProducts = async () => {
    await axios.get('http://localhost:8000/api/products', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }


  const products = useSelector(state => state.product.products);

  return (
    <div>
      {products.map(product => (
        <ProductListItem key={product.id} product={product} />
      ))}
      <button onClick= {() => loadProducts()}>Load Products</button>
    </div>
  );
}

export default ProductList;