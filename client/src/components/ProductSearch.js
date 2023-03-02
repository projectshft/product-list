import React, {useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { fetchProductsAsync, updateName } from '../features/product/productsSlice';

const ProductSearch = () => {
const dispatch = useDispatch();
const [productQuery, setProductQuery] = useState('');
const productDetails = useSelector((state) => state.products)

const handleChange = (event) => {
  setProductQuery(event.target.value);
}; 

const handleClick = () => {
  dispatch(updateName(productQuery))
  dispatch(fetchProductsAsync({category: productDetails.category, name: productQuery, 
  price: productDetails.price, page: productDetails.page})) 
  setProductQuery('');
};

  return (
    <InputGroup className="search-container" id="search-container">
      <Form.Control
      placeholder="Enter Product Name"
      aria-label="Product name"
      aria-describedby="basic-addon2"
      value={productQuery}
      onChange={handleChange}
      />
      <Button variant="outline-primary" id="button-addon2" 
      onClick={handleClick}>Search
      </Button>
      </InputGroup>
    )
};
  
export default ProductSearch;