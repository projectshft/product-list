import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { getProducts, setCurrentPage, setQueryData } from "../actions";
import { useEffect, useState } from "react";


const SearchBars = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchSort, setSearchSort] = useState('');

  const currentPage = useSelector((state) => state.pages.currentPage);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(searchCategory,searchSort, searchQuery,currentPage))
  }, [currentPage])

  const handleclick = () => {
    dispatch(setCurrentPage(1))
    dispatch(getProducts(searchCategory, searchSort, searchQuery, currentPage))
    dispatch(setQueryData(searchCategory,searchSort, searchQuery))
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
    <>
    <Form className="form-inline">
      <Row className="mt-5 px-0">
        <Col xs={5} className="px-1">
          <FormControl value={searchQuery} placeholder="Search" className="pr-4" onChange={validateSearch}/>
        </Col>
        <Col xs={3} className="px-1">
          <FormControl placeholder="Sort by Category" onChange={validateCategory}/>
        </Col>
        <Col xs={3} className="px-1">
          <FormControl placeholder="Sort by Price" onChange={validateSort}/>
        </Col>
        <Col className="px-1">
          <Button className="d-flex" type="button" onClick={handleclick}>Search</Button>
        </Col>
        
      </Row>
      
    </Form>
    </>
  )
}

export default SearchBars;