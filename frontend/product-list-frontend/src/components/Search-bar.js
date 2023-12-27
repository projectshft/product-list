import React from "react";
import { setQuery } from "../reducer/slice";
import { useDispatch } from "react-redux";
import { setPage } from "../reducer/slice";

function SearchBar () {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setQuery(event.target.value));
    dispatch(setPage(1));
  }
return (<div className = "col">
<input onChange = {handleChange} type="text" className="form-control" placeholder="Search Product"></input>
</div>)
}

export default SearchBar;

