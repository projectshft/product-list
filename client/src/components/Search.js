import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { changeCategoryFilter } from '../actions';
import { changePriceSortFilter } from '../actions';

const Search = () => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState(null)
  const [priceSort, setPriceSort] = useState(null)

  const dispatch = useDispatch();

  const handleSearchChange = (e) => setQuery(e.target.value);

  const handleCategoryChange = (e) => {
    dispatch(changeCategoryFilter(e.target.value))
  }
  
  const handlePriceSortChange = (e) => {
    dispatch(changePriceSortFilter(e.target.value))
    // setPriceSort(e.target.value);
    // console.log(priceSort)
  }

  return (
    <Form as={Row} className="mt-3">
        <Form.Group as={Col} className="mb-3">
          <InputGroup>
            <Form.Control onChange={(e) => handleSearchChange(e)} value={query} type="text" placeholder="Search to find products . . ." />
            <InputGroup.Text as={Button} type='submit'>
              Search
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md={3}>
          <Form.Select onChange={(e) => handleCategoryChange(e)} as={Col}>
            <option>Map all categories to these options</option>
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md={3}>
          <Form.Select value={priceSort} onChange={(e) => handlePriceSortChange(e)} as={Col}>
            <option value=''>Sort By Price</option>
            <option value='highest'>Highest to lowest</option>
            <option value='lowest'>Lowest to Highest</option>
          </Form.Select>
        </Form.Group>
    </Form>

  );
}

export default Search;
