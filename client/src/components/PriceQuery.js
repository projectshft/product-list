import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'


const PriceQuery = () => {
 
 const [priceQuery, setPriceQuery] = useState('')
  
  const handleSelect = (e) => {
    (setPriceQuery(e))
  };
  console.log({priceQuery})
  
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


     
