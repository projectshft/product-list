import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { getProducts } from "../actions";
import { useState } from "react";

const SearchBars = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchSort, setSearchSort] = useState('');

  const dispatch = useDispatch();

  const handleclick = () => {
    console.log([searchCategory, searchQuery, searchSort])
    dispatch(getProducts(searchCategory,searchSort, searchQuery))
  }

  const validateSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const validateCategory = (e) => {
    setSearchCategory(e.target.value)
  }

  const validateSort = (e) => {
    setSearchSort(e.target.value)
  }

  return (
    <Form>
      <Row className="mt-5 px-0">
        <Col xs={8} className="px-1">
          <FormControl value={searchQuery} placeholder="Search" className="pr-4" onChange={validateSearch}/>
        </Col>
        <Col className="px-1">
          <FormControl placeholder="Sort by Category" onChange={validateCategory}/>
        </Col>
        <Col className="px-1">
          <FormControl placeholder="Sort by Price" onChange={validateSort}/>
        </Col>
      </Row>
      <button type="button" onClick={handleclick}>click</button>
    </Form>
  )
}

export default SearchBars;