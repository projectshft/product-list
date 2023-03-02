import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Product from './Product';
import Container from 'react-bootstrap/Container';
import { fetchProductsAsync } from '../features/product/productsSlice';

const ShowProducts = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.products)  //state.reducer.piece of state requiring
  const { status, data } = productDetails;
  useEffect(() => {           
    dispatch(fetchProductsAsync({category: productDetails.category, name: productDetails.name, price: productDetails.price, page: productDetails.page, reset: productDetails.reset}))
  }, [dispatch, productDetails.category, productDetails.name, productDetails.price, productDetails.page, productDetails.reset])  //whatever is in function will happen after comp rendered 1st time
  
  return <Container>
    {status === 'pending' && <p>Waiting for products to load</p> }
      <div className='parent'> 
        {productDetails.resultsCount !== 'None' ? data.map((product) => {
          return <Product key={product.id} {...product} />
        }
        ) : <p>Oops, something went wrong!  Start by going back to page one, and if there are still no products preset Reset and try again...</p>}
      </div>  
    <br></br>        
  </Container> 
};

export default ShowProducts;