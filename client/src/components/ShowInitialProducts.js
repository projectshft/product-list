import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';
import Container from 'react-bootstrap/Container';

import products from '../products';

const ShowInitialProducts = () => {


  
 
  
 
  
  if (products.length < 1 )
  return (
    <h2>Error loading data</h2>
  )
  return <Container className="parent">
    <div> 
          {products.map((product) => {
            return <Product key={product.id} {...product} />
          }
          )}
          </div>  

  

  
     <br></br>        
     
  </Container> 

 
} 
export default ShowInitialProducts;

