import React from "react";
import Form from "react-bootstrap/Form";

const Header = ({ handleSearch, items }) => {
  
  let categories = items.reduce((acc, item) => { acc.push(item.category); return acc }, []);
  let set = new Set(categories);
  let arr = Array.from(set);
  

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
        {arr.map((category) => (
          <option>{category}</option>
        ))}
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
