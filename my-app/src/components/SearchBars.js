import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, InputGroup, FormControl, Button, Dropdown } from "react-bootstrap";
import { getProducts, setCurrentPage, setQueryData } from "../actions";
import { useEffect, useState } from "react";


const SearchBars = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchSort, setSearchSort] = useState('');

  const currentPage = useSelector((state) => state.pages.currentPage);
  const state = useSelector((state) => state);
  


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(searchCategory,searchSort, searchQuery,currentPage))
  }, [currentPage])

  const handleclick = () => {
    dispatch(setCurrentPage(1))
    dispatch(getProducts(searchCategory, searchSort, searchQuery, currentPage))
    dispatch(setQueryData(searchCategory,searchSort, searchQuery))
    console.log(state)
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
          <Form.Select onChange={validateCategory} aria-label="Default select example">
            <option value="">Sort by Category</option>
            <option value="tools">Tools</option>
            <option value="home">Home</option>
            <option value="baby">Baby</option>
            <option value="electronics">Electronics</option>
            <option value="shoes">Shoes</option>
            <option value="kids">Kids</option>
          </Form.Select>
        </Col>
        <Col xs={3} className="px-1">
          <Form.Select onChange={validateSort} aria-label="Default select example">
            <option value="">Sort by Price</option>
            <option value="highest">Highest to Lowest</option>
            <option value="lowest">Lowest to Highest</option>
          </Form.Select>
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