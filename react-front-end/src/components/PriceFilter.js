import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import {search} from '../actions/index'

function PriceFilter() {
  const currentQuery = useSelector(state => state.currentQuery)
  const dispatch = useDispatch();

  const changeSort =(priceSort) =>{
    console.log(priceSort)
    dispatch(search(1, currentQuery.category, currentQuery.queryString, priceSort))
  }
  
  return (
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Sort
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        <li onClick={() =>{changeSort('highest')}}>highest price</li>
        <li onClick={() =>{changeSort('lowest')}}>lowest price</li>
      </ul>
    </div>
  );
}

export default PriceFilter;


