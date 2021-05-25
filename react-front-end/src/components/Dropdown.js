import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import {search} from '../actions/index'

function Dropdown() {
  const dispatch = useDispatch();
  const currentQuery = useSelector(state => state.currentQuery);
  const categories = ['Jewelery', 'Automotive', 'Baby', 'Toys', 'Home', 'Beauty', 'Garden', 'Shoes', 'Outdoors', 'Computers', 'Sports', 'Grocery', 'Industrial', 'Games', 'Tools', 'Music', 'Health', 'Books']

  const changeCategory =(category) =>{
    console.log(category)
    dispatch(search(1, category, currentQuery.querystring, currentQuery.priceSort,))
  }
  
  return (
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
        Categories
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
        {categories.map(category => {
          return(
            <li><a class="dropdown-item" href='#' onClick={()=>{changeCategory(category)}}>{category}</a></li>
          )
        })}
      </ul>
    </div>
  );
}

export default Dropdown;


