import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Form  from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setCategoryFilter, setPriceFilter, setQueryFilter } from "../actions/index";

const SearchBar = () => {

  const { query, category, price } = useSelector(state => state.filter)
  const dispatch = useDispatch();
  
  const handleSearchButtonClick = (e) => {
    e.preventDefault();
    dispatch(fetchProducts(query, category, price));
  }

  const handleQueryClick = (e) => {
    dispatch(setQueryFilter(e.target.value));
  }

  const handleCategoryClick = (e) => {
    dispatch(fetchProducts(query, e.target.value, price));
    dispatch(setCategoryFilter(e.target.value));
  }

  const handlePriceClick = (e) => {
    dispatch(fetchProducts(query, category, e.target.value))
    dispatch(setPriceFilter(e.target.value));
  }

  return (
    <Row>
      <Col>
        <Form>
          <Row>
            <Form.Group as={Col} md="8" className="mb-3" controlId="formSearchInput">
              <InputGroup className="mb-3">
                <FormControl
                  required
                  placeholder="Type Search Here..."
                  type= "text"
                  value= {query}
                  onChange={handleQueryClick}
                />
                <Button variant="outline-secondary" id="search-button"
                  type="submit" onClick={handleSearchButtonClick}>
                  Search
                </Button>
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col} md="2" className="mb-3" controlId="formCategoryParameter">
              <Form.Select value={category} onChange={handleCategoryClick}>
                <option value="">Sort By Category...</option>
                <option value="Toys">Toys</option>
                <option value="Tools">Tools</option>
                <option value="Shoes">Shoes</option>
                <option value="Grocery">Grocery</option>
                <option value="Garden">Garden</option>
                <option value="Outdoors">Outdoors</option>
                <option value="Automotive">Automotive</option>
                <option value="Music">Music</option>
                <option value="Computers">Computers</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} md="2" className="mb-3" controlId="formSortParameter">
              <Form.Select value={price} onChange={handlePriceClick}>
                <option value="">Sort By Price...</option>
                <option value="highest">High to Low</option>
                <option value="lowest">Low to High</option>
              </Form.Select>
            </Form.Group>
          </Row>
        </Form>
      </Col>
    </Row>
  )
};

export default SearchBar;