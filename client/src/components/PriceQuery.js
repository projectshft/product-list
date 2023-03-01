import { useDispatch } from 'react-redux';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { updatePrice } from '../features/product/productsSlice';

const PriceQuery = () => {
const dispatch = useDispatch(); 

const handleSelect = (e) => {
  dispatch(updatePrice(e))
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

export default PriceQuery;

     
