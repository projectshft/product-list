import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getProducts } from "../actions/actions";

const Search = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setQuery(e.target.value);
    setInputValue(e.target.value);
  }

  const handleSubmit = (e) => {
    dispatch(getProducts(`?query=${query}`));
    setInputValue('');
    e.preventDefault();
  }

  return (
  <div className="row">
    <div className="col-md-6 offset-md-3 search-bar">
      <form onSubmit = {handleSubmit}>
        <div className="form-group row">
            <div className="col-md-8">
              <input className="form-control list-page-search-bar"
                placeholder="Search product" onChange={handleChange} value={inputValue}>
              </input>
            </div>

            <div className="col-md-2">
              <button className="btn btn-primary search-btn" type="submit">Search</button>
            </div>
        </div>
      </form>

      <hr></hr>
      </div>
    </div>
  )
}

export default Search;