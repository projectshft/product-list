/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  InputGroup,
  Form,
  Button,
  FormControl,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';

import { fetchProducts, fetchCategories } from '../actions';

const SearchBar = () => {
  const categories = useSelector((state) => state.categories);
  const pageCount = useSelector((state) => state.products.pageCount);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('asc');
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // fetches list categories for dropdown
  useEffect(() => {
    dispatch(fetchCategories()).then(() => {
      setLoading(false);
    });
  }, [fetchCategories]);

  useEffect(() => {
    dispatch(fetchProducts({ page, sort, category }));
  }, [page, sort, category]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchProducts());
    setSearchQuery('');
  };

  const renderCategories = () => {
    // while promise is pending
    if (loading) {
      return <Dropdown.Item href="#">Loading...</Dropdown.Item>;
    }
    // once products return
    if (categories.length) {
      return categories.map((cat, i) => (
        <Dropdown.Item
          key={i + 1}
          href="#"
          onClick={(e) => {
            setPage(1);
            setCategory(e.target.innerHTML);
          }}
        >
          {cat}
        </Dropdown.Item>
      ));
    }
    // if categories is empty
    return <Dropdown.Item>No categories found</Dropdown.Item>;
  };

  const renderPageNums = () => {
    const pages = [];
    for (let i = 1; i <= pageCount; i += 1) pages.push(i);
    return pages.map((pageNum) => (
      <span key={pageNum}>
        <Button
          variant="outline-secondary"
          href="#"
          onClick={(e) => setPage(e.target.innerHTML)}
        >
          {pageNum}
        </Button>{' '}
      </span>
    ));
  };

  return (
    <div>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="mb-2 mt-2">
          <Form onSubmit={handleSubmit}>
            <InputGroup className="pt-2 mb-3">
              <DropdownButton variant="outline-secondary" title="Sort">
                <Dropdown.Item onClick={() => setSort('asc')}>
                  Price $ to $$
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => setSort('desc')}>
                  Price $$ to $
                </Dropdown.Item>
              </DropdownButton>
              <DropdownButton variant="outline-secondary" title="Category">
                <Dropdown.Item
                  key={0}
                  href="#"
                  onClick={() => {
                    setPage(1);
                    setCategory(null);
                  }}
                >
                  All
                </Dropdown.Item>
                {renderCategories()}
              </DropdownButton>
              <FormControl
                placeholder="This does nothing"
                value={searchQuery}
                aria-label="Product Search"
                aria-describedby="products-search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="outline-secondary"
                type="submit"
                id="button-addon2"
              >
                Search
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }} className="text-center mb-4">
          <h5 className="text-muted">
            Page({page}): {renderPageNums()}
          </h5>
        </Col>
      </Row>
    </div>
  );
};

export default SearchBar;
