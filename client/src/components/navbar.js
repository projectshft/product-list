import React from "react";
import { useDispatch } from "react-redux";
import { updateCategory } from "../actions";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log(e.target.value);
    dispatch(updateCategory(e.target.value));
  }
  return (
    <div className="row">
      <div className="col-6">Search Bar</div>
      <div className="col-3">
        <select onChange={handleChange} className="form-select" aria-label="Category">
          <option value="">Sort by Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Music">Music</option>
        </select>
      </div>
      <div className="col-3">Drop Down 2</div>
    </div>
  )
}

export default NavBar;
