import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../actions';

const SearchOptions = () => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchProducts(term));
  }; 

  return (
    <div className='container search-options'>
     <div className='row'>
      <div className='col-md-6'>
        <form className='input-group' onSubmit={handleSubmit}>
          <input className='form-control' value={term} placeholder='Search' onChange={(e) => {setTerm(e.target.value)}}></input>
          <span className='input-group-btn'>
              <button className='btn btn-info' type='submit'>
                Submit
              </button>
            </span>
         </form>
        </div>
      <div className='col-md-3'>
        <h3>Category sort</h3>
      </div>
      <div className='col-md-3'>
        <h3>Price sort</h3>
      </div>
      </div>
    </div>
  )
};

export default SearchOptions; 