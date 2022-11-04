import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'react-bootstrap/';
import { fetchPagination } from '../actions/index';

export default function PaginationContainer() {
  const dispatch = useDispatch();
  const currentState = useSelector((state) => state.search.currentState);
  const activePage = useSelector((state) => state.search.currentPage);
  const docs = useSelector((state) => state.search.count);

  const pages = Math.ceil(docs / 9);
  const items = [];
  const handlePaginationClick = (e) => {
    dispatch(fetchPagination(currentState, e.target.innerText));
  };
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number == activePage}
        as="button"
        onClick={handlePaginationClick}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <Pagination size="sm" style={{ marginLeft: '48%' }}>
      {items}
    </Pagination>
  );
}
