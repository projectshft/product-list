import { React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions';


const ProductList = () => {

  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  console.log(products.length);

  const getPage = (e) => {
    console.log(e);   
  }


  useEffect(() => {
    dispatch(fetchProducts());
  }, [fetchProducts])

 


  return (

   <div className='product-container'>
    {products.map((result) => {
      return (
        <div className="col-3 products productCard">
          <div className='row'>
            <div id={result.key}>
              <span class='category'>Category: <strong>{result[1].category}</strong></span>
              <img class='image' src={result[1].image} alt='placeholder product'></img>
              <h2 class='product-name'>{result[1].name}</h2>
            </div>
          </div>
        </div>
      )
    })}
       

    <div className='container page-links'>
      <select name='page' onChange={(e) => getPage(e.target.value)}>
        <option value='1'>Page 1</option>
        <option value='2'>Page 2</option>
      <option onClick={(e) => getPage(e.target.value)} value='3' href='localhost:3000/products/?page=2'>Page 3</option>
      <option onClick={(e) => getPage(e.target.value)} value='4' href='localhost:3000/products/?page=2'>Page 4</option>
      </select>
    </div>
    </div>
  )
  
      
       
}

export default ProductList;