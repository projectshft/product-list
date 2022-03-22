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
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('asc');
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('null');
  const [searchQuery, setSearchQuery] = useState('');

  // fetches list categories for dropdown
  useEffect(() => {
    dispatch(fetchCategories()).then(() => {
      setLoading(false);
    });
  }, [fetchCategories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchProducts());
    setSearchQuery('');
  };

  const handleReOrg = (sortDir, pageNum, cat) => {
    setSort(sortDir);
    setPage(pageNum);
    setCategory(cat);

    const fetchOptions = {
      page: pageNum,
      sort: sortDir,
      category: cat,
    };

    dispatch(fetchProducts(fetchOptions));
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
          key={i}
          href="#"
          onClick={(e) => {
            handleReOrg(sort, page, e.target.innerHTML);
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
    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return pages.map((pageNum) => (
      <span key={pageNum}>
        <Button
          variant="outline-secondary"
          href="#"
          onClick={(e) => {
            handleReOrg(sort, e.target.innerHTML, category);
          }}
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
                <Dropdown.Item
                  onClick={() => handleReOrg('asc', page, category)}
                >
                  Price $ to $$
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => handleReOrg('desc', page, category)}
                >
                  Price $$ to $
                </Dropdown.Item>
              </DropdownButton>
              <DropdownButton variant="outline-secondary" title="Category">
                {renderCategories()}
              </DropdownButton>
              <FormControl
                placeholder="Search Products"
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
