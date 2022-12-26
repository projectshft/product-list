import React from "react";
import Form from "react-bootstrap/Form";

const Header = ({handleSearch}) => {



  ///////update store

  return (
    <form className="search-header" action="" onSubmit={(e) => handleSearch(e)}>
      <input
        type="text"
        className="search-block"
        name="query"
        placeholder="Search Products..."
      />
      <Form.Select
        aria-label="Default select example"
        className="dropdown-block"
        name="category"
      >
        <option value="none">Sort by Category</option>
        <option>Tools</option>
        <option>Health</option>
        <option>Outdoors</option>
      </Form.Select>
      <Form.Select
        aria-label="Default select example"
        className="dropdown-block"
        name="price"
      >
        <option value="none">Sort by Price</option>
        <option>Highest</option>
        <option>Lowest</option>
      </Form.Select>
      <input type="submit" value="Search" />
    </form>
  );
};

export default Header;
