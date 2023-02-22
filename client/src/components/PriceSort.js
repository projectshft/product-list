import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { sortPrice } from '../features/product/productSlice'
import products from '../products';

const PriceSort = () => {
  const dispatch = useDispatch();
  const [priceSort, setPriceSort] = useState('')
  const handleSelect = (e) => {
    console.log(e);
    setPriceSort(e)
  };

  return (
    <div id="search-container">
      <Row>
        <Col>

      
 
    <Dropdown className="price"  >
        <DropdownButton 
        title="Price"
        id="dropdown-autoclose-true"
        onSelect={handleSelect}
        >
          <Dropdown.Item eventKey="Highest">Highest</Dropdown.Item>
          <Dropdown.Item eventKey="Lowest">Lowest</Dropdown.Item>
        
          </DropdownButton>
      </Dropdown>
      </Col>
      </Row>
   
    </div>
  )
};

export default PriceSort;
