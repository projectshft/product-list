import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setPage } from '../actions';
import CategoryFilter from './CategoryFilter';
import SortPrice from './SortPrice';

const SearchOptions = () => {
  const page = useSelector((state) => state.products.currPage);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // if not on page 1 when query is submitted, reset to page 1 before searching
    if (page !== 1) {
      dispatch(setPage(1));
    };
    dispatch(setQuery(e.target[0].value));
  }; 

  return (
    <div className='container search-options'>
     <div className='row'>
      <div className='col-md-6'>
        <form className='input-group' onSubmit={handleSubmit}>
          <input className='form-control' placeholder='Search for a product'></input>
          <span className='input-group-btn'>
              <button className='btn btn-info' type='submit'>
                Submit
              </button>
            </span>
         </form>
        </div>
      <div className='col-md-3'>
        <CategoryFilter />
      </div>
      <div className='col-md-3'>
        <SortPrice />
      </div>
      </div>
    </div>
  )
};

export default SearchOptions; 