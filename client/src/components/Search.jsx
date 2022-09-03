import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SelectList from "./SelectList";
import { addProducts } from '../actions';

const sortByPriceList = ['Featured', 'Highest', 'Lowest']

const sortByCategoryList = [
  'All',
  'Automotive',  'Baby',
  'Beauty',      'Books',
  'Clothing',    'Computers',
  'Electronics', 'Games',
  'Garden',      'Grocery',
  'Health',      'Home',
  'Industrial',  'Jewelery',
  'Kids',        'Movies',
  'Music',       'Outdoors',
  'Shoes',       'Sports',
  'Tools',       'Toys'
]

const Search = ({ state, query, updateState }) => {
  const dispatch = useDispatch()

  const onKeyDown = (event) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      dispatch(addProducts(state));
    }
  }

  useEffect(() => {
    dispatch(addProducts({}));
  }, []);
  
  return (
    <div className="row g-2 mb-4">
      <div className="col-md-6">
        <input
          onKeyDown={onKeyDown}
          name="searchProducts"
          id="searchProducts"
          className="form-control"
          placeholder="Search for a product"
          value={state.query}
          onChange={event => {updateState('query', event.target.value)}}
        ></input>
      </div>
      <div className="col-md-3">
        <SelectList
          id="sortByCategory"
          name="sortByCategory"
          list={sortByCategoryList}
          updateState={updateState}
          field="category"
          state={state.category}
        />
      </div>
      <div className="col-md-3">
        <SelectList
          id="sortByPrice"
          name="sortByPrice"
          list={sortByPriceList}
          updateState={updateState}
          field="price"
          state={state.price}
        />
      </div>
    </div>
  );
};

export default Search;
