import React from "react";
import { useState } from "react";
//style
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

const Search = () => {
  const [input, setInput] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handlePriceClick = (e) => {
    setPrice(e.target.value);
  };

  const handleCategoryClick = (e) => {
    setCategory(e.targe.value);
  };

  return (
    <div>
      <StyledSearch>
        <form className="search">
          <input type="text" onChange={handleInput} value={input}></input>
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
                <Dropdown.Item
                  as="button"
                  className="highest"
                  value="highest"
                  onClick={handlePriceClick}
                >
                  Highest
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  className="lowest"
                  onClick={handlePriceClick}
                >
                  Lowest
                </Dropdown.Item>
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
                <Dropdown.Item
                  as="button"
                  value="home"
                  onClick={handleCategoryClick}
                >
                  Home
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  value="automotive"
                  onClick={handleCategoryClick}
                >
                  Automotive
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  value="grocery"
                  onClick={handleCategoryClick}
                >
                  Grocery
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  value="games"
                  onClick={handleCategoryClick}
                >
                  Games
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  value="electronics"
                  onClick={handleCategoryClick}
                >
                  Electronics
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  value="books"
                  onClick={handleCategoryClick}
                >
                  Books
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  value="clothing"
                  onClick={handleCategoryClick}
                >
                  Clothing
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  value="beauty"
                  onClick={handleCategoryClick}
                >
                  Beauty
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  value="industrial"
                  onClick={handleCategoryClick}
                >
                  Industrial
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  value="computers"
                  onClick={handleCategoryClick}
                >
                  Computers
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  value="music"
                  onClick={handleCategoryClick}
                >
                  Music
                </Dropdown.Item>
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
