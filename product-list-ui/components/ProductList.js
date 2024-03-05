import React, { useEffect, useState } from 'react';
import ProductListItem from './ProductListItem';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../app/store/slices/productSlice';
import { fetchProducts } from '../app/store/slices/productSlice';
import { set } from 'mongoose';

const ProductList = () => {
  
  const dispatch = useDispatch();
  const [pages, setPages] = useState(0);

  useEffect(() => {

    axios.get('http://localhost:8000/api/products', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
    .then(response => {
      dispatch(setProducts(response.data.products))
      
      setPages(response.data.pages)
    });
  }
  , []);

  const getNewPage = async (page) => {
    const product = await dispatch(fetchProducts(page));
    dispatch(setProducts(product.payload));
  }

  const products = useSelector((state) => state.product.products);

  const generatePageButtons = () => {
    let buttons = [];
    for(let i = 1; i <= pages; i++) {
      buttons.push(<button key={i} onClick={() => getNewPage(i)}>{i}</button>)
    }
    return buttons;
  }

  return (
    <div>
    <div className='d-flex flex-wrap justify-content-center'>
      {products.map(product => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
    <div className='text-center'>
      Pages {generatePageButtons()}
    </div>
    </div>
  );
}

export default ProductList;