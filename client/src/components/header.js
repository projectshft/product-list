import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import { FormControl, Form, Col, Row, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { productSearch } from '../actions/index'


function Header() {
  const dispatch = useDispatch();

  const [search, setSearch] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();

  const validatePrice = (e) => {
    setPrice(e.target.value);
  };

  const validateSearch = (e) => {
    setSearch(e.target.value);
  };

  const validateCategory = (e) => {
    setCategory(e.target.value)
  }
  
  const page = 1;

  const handleSubmit = () => {
    let Price = price;
    let Search = search;
    let Category = category;
    if(price === undefined) {
      Price = '';
    }
    if (search === undefined) {
      Search = '';
    }
    if (category === undefined) {
      Category = '';
    };

    console.log(Price + ' ' + Search + ' ' + Category);
    dispatch(productSearch(Price, Search, Category, page))
  };

  return (
    <Container>
      <Form className='search-sort-area'>
        <Row className='pt-3'>
          <Col xs={5}>
            <FormControl placeholder="Search" onChange={validateSearch}/>
          </Col>
          <Col xs={2}>
            <Form.Select value={category} onChange={validateCategory}>
              <option value="">Sort by Category</option>
              <option value="Electronic">Electronic</option>
              <option value="Clothing">Clothing</option>
              <option value="Computer">Computer</option>
              <option value="Home">Home</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Kid">Kid</option>
              <option value="Toys">Toys</option>
              <option value="Tools">Tools</option>
              <option value="Sports">Sports</option>
              <option value="Movies">Movies</option>
              <option value="Outdoors">Outdoors</option>
            </Form.Select>
          </Col>
          <Col xs={2}>
            <Form.Select value={price} onChange={validatePrice}>
            <option value="">Sort by Price</option>
            <option value="Highest">Highest</option>
            <option value="Lowest">Lowest</option>
            </Form.Select>
          </Col>
          <Col xs={2}>
            <Button variant="primary" onClick={handleSubmit} >Search</Button>{' '}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Header;