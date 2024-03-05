import React, { useEffect, useState } from 'react';
import ProductListItem from './ProductListItem';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../app/store/slices/productSlice';
import { fetchProducts } from '../app/store/slices/productSlice';
import { set } from 'mongoose';

const ProductList = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {

    axios.get('http://localhost:8000/api/products', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
    .then(response => {
      dispatch(setProducts(response.data))
    });
  }
  , []);

  const products = useSelector((state) => state.product.products);

  return (
    <div>
    <div className='d-flex flex-wrap justify-content-center'>
      {products.map(product => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
    <div>
      Pages <a>1</a>
    </div>
    </div>
  );
}

export default ProductList;