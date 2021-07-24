import React from "react";
import { useState, useEffect } from "react";
//style
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//redux
import { useDispatch } from "react-redux";
import { loadProductsData } from "../actions/productsAction";

const Search = () => {
  //redux
  const dispatch = useDispatch();
  //state
  const [input, setInput] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");

  //event handlers
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handlePriceClick = (e) => {
    setPrice(e.target.value);
    if (e.target.value === "Price") {
      setPrice("");
    }
  };

  const handleCategoryClick = (e) => {
    setCategory(e.target.value);
    if (e.target.value === "Category") {
      setCategory("");
    }
  };

  const handleSearchButtonClick = () => {
    if (input && !price && !category) {
      setQuery(`?query=${input}`);
    } else if (price && !category && !query) {
      setQuery(`?price=${price}`);
    } else if (category && !input && !price) {
      setQuery(`?category=${category}`);
    } else if (input && category) {
      if (price) {
        return setQuery(`?query=${input}&category=${category}&price=${price}`);
      }
      setQuery(`?query=${input}&category=${category}`);
    } else if (input && price) {
      setQuery(`?query=${input}&price=${price}`);
    } else {
      setQuery("/");
    }
  };

  useEffect(() => {
    if (query) {
      dispatch(loadProductsData(query));
    }
  }, [query]);

  return (
    <div>
      <StyledSearch>
        <form className="search">
          <input type="text" onChange={handleInput} value={input}></input>

          <div className="form-select-options">
            <Form.Select
              aria-label="Default select example"
              className="form-select-label"
              onChange={handlePriceClick}
            >
              <option>Price</option>
              <option value="highest">Highest</option>
              <option value="lowest">Lowest</option>
            </Form.Select>

            <Form.Select
              aria-label="Default select example"
              // size="lg"
              className="form-select-label"
              onChange={handleCategoryClick}
            >
              <option>Category</option>
              <option value="automotive">Automotive</option>
              <option value="books">Books</option>
              <option value="beauty">Beauty</option>
              <option value="clothing">Clothing</option>
              <option value="computers">Computers</option>
              <option value="eletctronics">Electronics</option>
              <option value="games">Games</option>
              <option value="grocery">Grocery</option>
              <option value="home">Home</option>
              <option value="industrial">Industial</option>
              <option value="music">Music</option>
            </Form.Select>

            <Button
              variant="outline-dark"
              className="submit"
              onClick={handleSearchButtonClick}
            >
              Search
            </Button>
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
    font-family: "Source Sans Pro", sans-serif;
    margin-top: 1rem;
    margin-right: 1rem;
  }
  .form-select-options {
    display: inline-flex;
    border: none;
    padding: 0.5rem 0.5rem;
  }
  .form-select-label {
    margin-right: 0.5rem;
  }
`;

export default Search;
