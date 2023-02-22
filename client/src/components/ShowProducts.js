import React from 'react';

import Product from './Product';
import Container from 'react-bootstrap/Container';
import products from '../products';


//import PageItem from 'react-bootstrap/PageItem'





const ShowProducts = () => {

  // const {product} = useSelector((storeState) => storeState.product)
  // const {category} = useSelector((storeState) => store.category)
  
 
  
 
  
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
export default ShowProducts;

