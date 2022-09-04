// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SelectList from "./SelectList";
// import { addProducts } from '../actions';

const sortByPriceList = ['Featured', 'Highest', 'Lowest']

const selectCategories = (state) => state.categories;

const Search = ({ state, updateState, setState }) => {
  const categories = useSelector(selectCategories)
    
  const onChange = (event) => {
    updateState('query', event.target.value)
  }

  if (!categories) return <></>
  
  return (
    <div className="row g-2 mb-4">
      <div className="col-md-6">
        <input
          name="searchProducts"
          id="searchProducts"
          className="form-control"
          placeholder="Search for a product"
          value={state.query}
          onChange={event => {onChange(event)}}
        ></input>
      </div>
      <div className="col-md-3">
        <SelectList
          id="sortByCategory"
          name="sortByCategory"
          list={categories}
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
