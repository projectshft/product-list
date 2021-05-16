import { useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {search} from '../actions/index'

function SearchBar() {
  const [query, setQuery] = useState();
  const currentQuery = useSelector(state => state.currentQuery)
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const newQuery =() =>{
    dispatch(search(null, null, query, null))
  }
  
  return (
      <>
        <div className="input-group input-group-sm mb-3">
          <div className="input-group-prepend">
            <button className="btn btn-outline-secondary" type="button" onClick={()=>{newQuery()}}>Search</button>
          </div>
          <div>
            <input placeholder={currentQuery.QueryString} onChange={handleChange} type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
          </div>
        </div>
      </>
  );
}

export default SearchBar;