import React from "react";
import { useDispatch } from "react-redux";
import { search, updateCategory, sortByPrice } from "../actions";

const NavBar = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    if (e.charCode === 13 && e.target.value !== "") {
      console.log(e.target.value);
      dispatch(search(e.target.value));
    }
  }
  const handleChangeCategory = (e) => {
    dispatch(updateCategory(e.target.value));
  }
  const handleChangePrice = (e) => {
    dispatch(sortByPrice(e.target.value));
  }
  return (
    <div className="row">
      <div className="col-6">
        <input onKeyPress={handleSubmit} type="text" placeholder="Search"></input>
      </div>
      <div className="col-3">
        <select onChange={handleChangeCategory} className="form-select">
          <option value="">Sort by Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Music">Music</option>
        </select>
      </div>
      <div className="col-3">
        <select onChange={handleChangePrice} className="form-select">
          <option>Sort by Price</option>
          <option value="highest">Highest to Lowest</option>
          <option value="lowest">Lowest to Highest</option>
        </select>
      </div>
    </div>
  )
}

export default NavBar;
