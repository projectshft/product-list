import { React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductCount } from '../actions/actions.js';

const PageSelection = () => {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  

  return (
    <h1>This is the pages selection {count}</h1>
  )
}

export default PageSelection