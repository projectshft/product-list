import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategorySelect = (e) => {
    e.preventDefault();
    console.log(e);
    // dispatch(fetchProducts(currentCity));
    // setCity("");
  };

  return (
    <div className="App">
      <h1 className="text-muted display-1 header">Anazon</h1>
      <div className="customerInput">
        <div className="searchBar">
          <input
            className="form-control"
            value={searchTerm}
            placeholder="Search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          ></input>
        </div>
        <div className="category">
          <select
            className="form-control"
            name="category"
            id="category"
            onChange={(e) => handleCategorySelect(e)}
          >
            {/* Need to write a function to pull out categories */}
            <option selected="selected">Select a Category ▼</option>
            <option value="Automotive">Automotive</option>
            <option value="Baby">Baby</option>
            <option value="Beauty">Beauty</option>
            <option value="Books">Books</option>
            <option value="Clothing">Clothing</option>
            <option value="Computers">Computers</option>
            <option value="Electronics">Electronics</option>
            <option value="Games">Games</option>
            <option value="Garden">Garden</option>
            <option value="Grocery">Grocery</option>
            <option value="Health">Health</option>
            <option value="Home">Home</option>
            <option value="Industrial">Industrial</option>
            <option value="Jewelery">Jewelery</option>
            <option value="Kids">Kids</option>
            <option value="Movies">Movies</option>
            <option value="Music">Music</option>
            <option value="Outdoors">Outdoors</option>
            <option value="Shoes">Shoes</option>
            <option value="Sports">Sports</option>
            <option value="Tools">Tools</option>
            <option value="Toys">Toys</option>
          </select>
        </div>
        <div className="sort">
          <select
            className="form-control"
            name="sort"
            id="sort"
            placeholder="Sort by Price"
          >
            <option selected="selected">Sort by ▼</option>
            <option value="highest">Highest</option>
            <option value="lowest">Lowest</option>
          </select>
        </div>
      </div>
      <div className="products"></div>
    </div>
  );
}

export default App;
