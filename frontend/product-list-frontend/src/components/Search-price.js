import React from "react";
import { setPrice } from "../reducer/slice";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../reducer/slice";


function SearchPrice (props) {
  const stateQuery = useSelector(state => state.query)

  const dispatch = useDispatch();
  // const query = props.query;
  // const setQuery = props.setQuery;
  const handleChange = (event) => {
    dispatch(setPrice(event.target.value));
    dispatch(setPage(1));
    console.log(stateQuery)
  }
  return (
    <select defaultValue = "" onChange = {handleChange} className="col form-select" aria-label="Default select example">
    <option value="" disabled hidden>Sort By Price</option>
  <option value="highest">Highest</option>
  <option value="lowest">Lowest</option>
</select>
  )
}

export default SearchPrice;