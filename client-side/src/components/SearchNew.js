import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../actions/fetchProducts";
import { useEffect } from "react";


const withoutSearch = {
  query: "",
  category: "",
  price: "",
}

const SearchNew = () => {
  const [search, setSearch] = useState(withoutSearch);
  const dispatch = useDispatch();

  useEffect (() => {
    dispatch(fetchProducts(search));
  }, [search , dispatch]);

  function handleSearch(event) {
    setSearch({
      ...search,
      query: event.target.value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch ({
      ...search,
      query: event.target.value,
    });
    console.log(search);
      dispatch(fetchProducts(search));
  };

  return (
    <div>
      <form className="searchLine" onSubmit={handleSubmit}>
        <div className="input-group" id="search">
          <input
            type="search"
            name= "query"
            className="form-control rounded"
            placeholder="Search"
            onChange = {(event) => handleSearch(event)}
          ></input>
          <button type="submit" className="btn btn-outline-primary">
            Search
          </button>
        </div>
      </form>
      <Dropdown className="drop">
        <DropdownButton id="dropdown-basic-button" title="Category">
          <Dropdown.Item href="#/action-1">Movies</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Jewelery</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Industrial</Dropdown.Item>
          <Dropdown.Item href="#/action-4">Clothing</Dropdown.Item>
          <Dropdown.Item href="#/action-5">Computers</Dropdown.Item>
          <Dropdown.Item href="#/action-6">Baby</Dropdown.Item>
          <Dropdown.Item href="#/action-7">Books</Dropdown.Item>
          <Dropdown.Item href="#/action-8">Kids</Dropdown.Item>
          <Dropdown.Item href="#/action-9">Tools</Dropdown.Item>
          <Dropdown.Item href="#/action-10">Electronics</Dropdown.Item>
          <Dropdown.Item href="#/action-11">Games</Dropdown.Item>
          <Dropdown.Item href="#/action-12">Toys</Dropdown.Item>
          <Dropdown.Item href="#/action-13">Garden</Dropdown.Item>
          <Dropdown.Item href="#/action-14">Industrial</Dropdown.Item>
          <Dropdown.Item href="#/action-15">Grocery</Dropdown.Item>
          <Dropdown.Item href="#/action-16">Music</Dropdown.Item>
          <Dropdown.Item href="#/action-17">Health</Dropdown.Item>
          <Dropdown.Item href="#/action-18">Outdoors</Dropdown.Item>
          <Dropdown.Item href="#/action-19">Shoes</Dropdown.Item>
          <Dropdown.Item href="#/action-20">Computers</Dropdown.Item>
          <Dropdown.Item href="#/action-21">Sports</Dropdown.Item>
          <Dropdown.Item href="#/action-22">Beauty</Dropdown.Item>
          <Dropdown.Item href="#/action-23">Home</Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Price">
          <Dropdown.Item href="#/action-1">Lowest to Highest</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Highest to Lowest</Dropdown.Item>
        </DropdownButton>
        <br></br>
        <br></br>
      </Dropdown>
      <br></br>
      <br></br>
    </div>
  );
};

export default SearchNew;
