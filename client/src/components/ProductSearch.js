import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { getProduct } from '../features/product/productSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup'

const ProductSearch = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [productName, setProductName] = useState(inputValue)

  const onChangeHandler = (event) => {
    setInputValue(event.target.value)
  };

  const fetchProductName = () => {
   console.log(getProduct(inputValue))
  };

  
  
  return (
    <div id="search-container">
    <Form>
      <Row>
        
      <InputGroup className="product-search">
        <Form.Control
          placeholder="Product Name"
          aria-label="Search for product"
          aria-describedby="basic-addon2"
          onChange={onChangeHandler}
          value={inputValue}
        />
        <Button onClick={fetchProductName} variant="outline-primary" id="button-addon2">
          Search
        </Button>
      </InputGroup>
    </Row>
    </Form>
    </div>
    
  );
}

export default ProductSearch;

