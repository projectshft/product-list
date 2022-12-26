import React from 'react'
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Header = () => {
  return (
    <form className="search-header" action="">
      <input
        type="text"
        className="search-block"
        placeholder="Search Products..."
      />

      <DropdownButton
        id="dropdown-basic-button"
        className="dropdown-block"
        title="Sort by Category"
      >
        <Dropdown.Item href="#/action-1">Outdoors</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Home</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Shoes</Dropdown.Item>
      </DropdownButton>
      <DropdownButton
        id="dropdown-basic-button"
        className="dropdown-block"
        title="Sort by Price"
      >
        <Dropdown.Item href="#/action-1">Highest to Lowest</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Lowest to Highest</Dropdown.Item>
      </DropdownButton>
    </form>
  );
}

export default Header