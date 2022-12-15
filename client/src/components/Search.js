import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { changeCategoryFilter, changePriceSortFilter, setProducts, setQuery } from '../actions';
import { fetchProducts } from '../helpers/fetchData';

const Search = () => {
  const { category, priceSort, query } = useSelector(state => state.filters)
  const categories = useSelector(state => state.categories);

  const dispatch = useDispatch();

  const handleSearchChange = (e) => dispatch(setQuery(e.target.value))

  const handleCategoryChange = (e) => {
    dispatch(changeCategoryFilter(e.target.value))
  }

  const handlePriceSortChange = (e) => {
    dispatch(changePriceSortFilter(e.target.value))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { products } = await fetchProducts(category, priceSort, 1, query)

    dispatch(setProducts(products))
  }

  const populateCategories = () => {
    return categories.map((category, index) => {
      return <option key={index} value={category}>{category}</option>
    })
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)} className="mt-3">
      <Row>
        <Form.Group as={Col} className="mb-3">
          <InputGroup>
            <Form.Control onChange={(e) => handleSearchChange(e)} type="text" placeholder="Search to find products . . ." />
            <InputGroup.Text onClick={handleSubmit} as={Button} type='submit'>
              Search
            </InputGroup.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md={3}>
          <Form.Select onChange={(e) => handleCategoryChange(e)} as={Col}>
            <option value=''>Sort By Category</option>
            {populateCategories()}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md={3}>
          <Form.Select onChange={(e) => handlePriceSortChange(e)} as={Col}>
            <option value=''>Sort By Price</option>
            <option value='highest'>Highest to lowest</option>
            <option value='lowest'>Lowest to Highest</option>
          </Form.Select>
        </Form.Group>
      </Row>
    </Form>

  );
}

export default Search;
