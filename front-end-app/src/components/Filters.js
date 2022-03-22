import {Container, Row, Col, Form} from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchSetting, QUERY_SET, CATEGORY_SET, PRICE_SORT_SET } from '../actions';

const Filters = () => {
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchSetting(QUERY_SET, e.target.value));
    }
  }

  const handleCategoryChange = (e) => {
    dispatch(setSearchSetting(CATEGORY_SET, e.target.value));
  }

  const handlePriceSortChange = (e) => {
    dispatch(setSearchSetting(PRICE_SORT_SET, e.target.value));
  }

  return (
    <div className="filter-bar">
      <Container>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Control value={search} onKeyPress={handleSearchKeyPress} placeholder='Search By Product Name' onChange={(e) => {setSearch(e.target.value)}}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Select onChange={handleCategoryChange}>
                <option value=''>Filter By Category</option>
                <option value="tools">Tools</option>
                <option value="garden">Garden</option>
                <option value="health">Health</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Select onChange={handlePriceSortChange}>
                <option value=''>Filter By Price</option>
                <option value="lowest">Lowest to Highest</option>
                <option value="highest">Highest to Lowest</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default Filters;