import React from 'react'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Header = () => {
  const handleSearch = (event) => {
    let query = event.target.query.value
    let category = event.target.category.value;
    let price = event.target.price.value;
    console.log(query, category, price)
  }

  return (
    <form
      className="search-header"
      action=""
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch(e);
        }
      }}
    >
      <input
        type="text"
        className="search-block"
        name="query"
        placeholder="Search Products..."
      />

      <DropdownButton
        id="dropdown-basic-button"
        className="dropdown-block"
        name="category"
        title="Sort by Category"
      >
        <Dropdown.Item href="#/action-1">Outdoors</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Home</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Shoes</Dropdown.Item>
      </DropdownButton>
      <DropdownButton
        id="dropdown-basic-button"
        className="dropdown-block"
        name="price"
        title="Sort by Price"
      >
        <Dropdown.Item href="#/action-1">Highest to Lowest</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Lowest to Highest</Dropdown.Item>
      </DropdownButton>
      <input type="submit" />
    </form>
  );
}

export default Header