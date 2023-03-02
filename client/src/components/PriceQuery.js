import { useDispatch } from 'react-redux';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { updatePrice } from '../features/product/productsSlice';

const PriceQuery = () => {
const dispatch = useDispatch(); 

const handleSelect = (e) => {
  dispatch(updatePrice(e))
};

  return (
    <div>
      <Dropdown className="drop-down-child"  >
        <DropdownButton 
        className="drop-down-child"
        title="Price"
        id="dropdown-autoclose-true"
        onSelect={handleSelect}
        >
        <Dropdown.Item eventKey="Highest">Highest</Dropdown.Item>
        <Dropdown.Item eventKey="Lowest">Lowest</Dropdown.Item>
        </DropdownButton>
        </Dropdown>
    </div>
  )
};

export default PriceQuery;