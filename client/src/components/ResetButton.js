import { useDispatch } from 'react-redux';
import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { resetData } from '../features/product/productsSlice';

const ResetButton = () => {
const dispatch = useDispatch(); 

const handleSelect = (e) => {
  dispatch(resetData(e))
};

  return (
    <div>
      <Dropdown className="drop-down-child"  >
      <DropdownButton 
        className="drop-down-child"
        title="Reset"
        id="dropdown-autoclose-true"
        onSelect={handleSelect}
        >
        <Dropdown.Item eventKey="Clear Search">Clear Search</Dropdown.Item>
        </DropdownButton>
        </Dropdown>
    </div>
  )
};

export default ResetButton;