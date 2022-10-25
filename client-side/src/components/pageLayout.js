import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React from "react";


function BasicExample() {
  return (
    <div>
      <form className="searchLine">
        <div className="input-group" id="search">
          <input
            type="text"
            className="form-control rounded"
            placeholder="Search"
          ></input>
          <button type="submit" className="btn btn-outline-primary">
            Search
          </button>
        </div>
      </form>
      <Dropdown className="drop">
        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton>
      </Dropdown>
      <br></br>
      <br></br>
    </div>
  );
}

export { BasicExample };
