import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../actions";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';

const Main = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProducts]);

  function renderSearchAndFilter() {
    return (
      <div className ="container">
        <div className="row">
          <div className ="col-md-6">
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="primary">Search</Button>
            </Form>
          </div>
          <div className ="col-md-3">
            <DropdownButton id="dropdown-basic-button" title="Sort By Category">
              <Dropdown.Item href="#/action-1">Beauty</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Electronics</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Sports</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Shoes</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Music</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Home</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Computers</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Outdoors</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Grocery</Dropdown.Item>
              <Dropdown.Item href="#/action-4">Movies</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className ="col-md-3">
          <DropdownButton id="dropdown-basic-button" title="Sort By Price">
              <Dropdown.Item href="#/action-1">highest</Dropdown.Item>
              <Dropdown.Item href="#/action-2">lowest</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    )
  }

  const productCard = () => {
    // if(products.length > 9) {
    return products.map((product, i) => (
    <div className="col-md-4">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
        <Card.Text>
            Category: <strong>{product.category}</strong>
          </Card.Text>
          <Card.Text>
            Price: <strong>${product.price}</strong>
          </Card.Text>
          </Card.Body>
        <Card.Img variant="top" src="https://via.placeholder.com/250?text=Product+Image"/>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
        </Card.Body>
      </Card>
    </div>
    ));
    //}
  }

  function renderProducts() {
    return (
      <div className="container">
        <div className="row">
          {productCard()} 
        
        </div>
      </div>
    )
  }

  return (
    <div>
      {renderSearchAndFilter()}
      {renderProducts()}
    </div> 
  )
}

export default Main;