import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useMemo, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAction } from '../features/productsSlice';


const ProductDisplay = () => {
  const dispatch = useDispatch();
  // Access State to create query input.
  const productData = useSelector((state) => state.productStore);
  const queryInputs = useSelector((state) => state.queryInputs)
  
  console.log(productData);

  useMemo(() => {
    dispatch(fetchProductsAction(queryInputs)
  )}, [queryInputs]);
  
  
  if (productData.products.length > 0) {
    return (
      <h1>Products Here</h1>
    )
  } else {
    return (
      <h1>No products found.</h1>
    )
  }
}

export default ProductDisplay
