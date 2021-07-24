import React from "react";
import { useState } from "react";
//style
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

const Search = () => {
  const [textInput, setTextInput] = useState("");
  const handleInput = (e) => {
    setTextInput(e.target.value);
  };

  return (
    <div>
      <StyledSearch>
        <form className="search">
          <input type="text" onChange={handleInput} value={textInput}></input>
          <Button variant="outline-dark">Search</Button>
          <div className="dropdown-buttons">
            <Dropdown>
              <Dropdown.Toggle
                variant="dark"
                id="dropdown-basic"
                className="price dropdown-btn"
              >
                Sort by Price
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as="button">Highest</Dropdown.Item>
                <Dropdown.Item as="button">Lowest</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle
                variant="dark"
                id="dropdown-basic"
                className="category dropdown-btn"
              >
                Sort by Category
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as="button">Home</Dropdown.Item>
                <Dropdown.Item as="button">Automotive</Dropdown.Item>
                <Dropdown.Item as="button">Grocery</Dropdown.Item>
                <Dropdown.Item as="button">Games</Dropdown.Item>
                <Dropdown.Item as="button">Electronics</Dropdown.Item>
                <Dropdown.Item as="button">Books</Dropdown.Item>
                <Dropdown.Item as="button">Clothing</Dropdown.Item>
                <Dropdown.Item as="button">Beauty</Dropdown.Item>
                <Dropdown.Item as="button">Industrial</Dropdown.Item>
                <Dropdown.Item as="button">Computers</Dropdown.Item>
                <Dropdown.Item as="button">Music</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </form>
      </StyledSearch>

      <br></br>
    </div>
  );
};

const StyledSearch = styled.div`
  padding: 0;
  width: 100%;
  text-align: center;

  justify-content: space-around;
  input {
    width: 40%;
    font-size: 1rem;
    font-weight: bold;
    font-family: "Monserrat", sans-serif;
    padding: 0.5rem;
    margin-top: 1rem;
    margin-right: 1rem;
  }
  .submit {
    font-size: 1rem;
    padding: 0.5rem 2rem;
    cursor: pointer;
    background: white;
    color: black;
  }
  .dropdown-buttons {
    display: inline-flex;
    border: none;
    padding: 0.5rem 2rem;
  }
  .dropdown-btn {
    background: white;
    color: black;
    margin-right: 0.5rem;
    &:hover {
      background-color: black;
      color: white;
    }
  }
`;

export default Search;
