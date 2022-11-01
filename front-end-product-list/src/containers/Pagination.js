import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'react-bootstrap/';
import { fetchQuery,fetchPagination } from '../actions/index';

export default function PaginationContainer() {
  const dispatch = useDispatch();
  const state=useSelector((state) => state.search)
  console.log(state);
  const currentState=useSelector((state) => state.pagination.currentState);
  const activePage=useSelector((state)=>state.pagination.currentPage)
  const docs = useSelector((state) => state.search.count);
  
  const pages = Math.ceil(docs / 9);
  const items = [];
  const handlePaginationClick=(e)=>{
    dispatch(fetchPagination(currentState,e.target.value))
  }
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item 
      key={number} 
      value={number}
      active={number === activePage}
      as='button'
      onClick={handlePaginationClick}
      >
        {number}
      </Pagination.Item>
    );
  }
  return <Pagination style={{ marginLeft: '40%' }}>{items}</Pagination>;
}