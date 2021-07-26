import { useState, useEffect } from "react";
//style
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//redux
import { useDispatch } from "react-redux";
import { loadProductsData } from "../actions/productsAction";
import { loadQuery } from "../actions/queryAction";

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
  };

  const handleCategoryClick = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchEvent = () => {
    if (input && !price && !category) {
      setQuery(`?query=${input}`);
    } else if (price && !category && !input) {
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
    } else if (price && category) {
      setQuery(`?category=${category}&price=${price}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter") {
      handleSearchEvent();
    }
  };

  useEffect(() => {
    if (query) {
      dispatch(loadProductsData(query));
      dispatch(loadQuery(query));
    }
  }, [query, dispatch]);

  return (
    <div>
      <StyledSearch>
        <form className="search">
          <input
            type="text"
            onChange={handleInput}
            value={input}
            placeholder="Search"
            onKeyPress={handleKeyPress}
          ></input>

          <div className="form-select-options">
            <Form.Select
              aria-label="Default select example"
              className="form-select-label"
              onChange={handlePriceClick}
            >
              <option value="">Price</option>
              <option value="highest">Highest</option>
              <option value="lowest">Lowest</option>
            </Form.Select>

            <Form.Select
              aria-label="Default select example"
              // size="lg"
              className="form-select-label"
              onChange={handleCategoryClick}
            >
              <option value="">Category</option>
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
              variant="dark"
              className="submit search-button"
              onClick={handleSearchEvent}
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
