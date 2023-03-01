import React from 'react'
import { useDispatch } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateCategory } from '../features/product/productsSlice';


const CategorySearch = () => {
  const dispatch =  useDispatch();

  const handleSelect = (e) => {
    console.log(e)  //e being captured correctly
    dispatch(updateCategory(e))
  }; 

  return (
    <div id="search-container">
    
  <Row>
  <Col>
  <Dropdown className="category"  >
  <DropdownButton 
  title="Category"
  id="dropdown-autoclose-true"
  onSelect={handleSelect}
  >
    <Dropdown.Item eventKey="Automotive">Automotive</Dropdown.Item>
    <Dropdown.Item eventKey="Baby">Baby</Dropdown.Item>
    <Dropdown.Item eventKey="Beauty">Beauty</Dropdown.Item>
    <Dropdown.Item eventKey="Books">Books</Dropdown.Item>
    <Dropdown.Item eventKey="Clothing">Clothing</Dropdown.Item>
    <Dropdown.Item eventKey="Computers">Computers</Dropdown.Item>
    <Dropdown.Item eventKey="Electronics">Electronics</Dropdown.Item>
    <Dropdown.Item eventKey="Games">Games</Dropdown.Item>
    <Dropdown.Item eventKey="Garden">Garden</Dropdown.Item>
    <Dropdown.Item eventKey="Grocery">Grocery</Dropdown.Item>
    <Dropdown.Item eventKey="Health">Health</Dropdown.Item>
    <Dropdown.Item eventKey="Home">Home</Dropdown.Item>
    <Dropdown.Item eventKey="Industrial">Industrial</Dropdown.Item>
    <Dropdown.Item eventKey="Jewelery">Jewelery</Dropdown.Item>
    <Dropdown.Item eventKey="Kids">Kids</Dropdown.Item>
    <Dropdown.Item eventKey="Movies">Movies</Dropdown.Item>
    <Dropdown.Item eventKey="Music">Music</Dropdown.Item>
    <Dropdown.Item eventKey="Outdoors">Outdoors</Dropdown.Item>
    <Dropdown.Item eventKey="Shoes">Shoes</Dropdown.Item>
    <Dropdown.Item eventKey="Sports">Sports</Dropdown.Item>
    <Dropdown.Item eventKey="Tools">Tools</Dropdown.Item>
    <Dropdown.Item eventKey="Toys">Toys</Dropdown.Item>
    </DropdownButton>  
  </Dropdown>
  </Col>
  </Row>
  </div>   
  )
};

export default CategorySearch;