import React from "react";
import "bootstrap/dist/css/bootstrap.css";


function SearchBar() {
  return (
<div className="container search-sort-area">

<div className="input-group search-bar">
  <input type="text" className="form-control mb-3" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
  <button className="btn btn-outline-primary mb-3" type="button">Search</button>
  </div>

  <div class="input-group mb-3 ">
  <input type="text" className="form-control" aria-label="Text input with dropdown button" />
  <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Sort by Category</button>
  <ul className="dropdown-menu dropdown-menu-end">
    <li><a className="dropdown-item" href="/">Automotive</a></li>
    <li><a className="dropdown-item" href="/">Baby</a></li>
    <li><a className="dropdown-item" href="/">Beauty</a></li>
    <li><a className="dropdown-item" href="/">Books</a></li>
    <li><a className="dropdown-item" href="/">Clothing</a></li>
    <li><a className="dropdown-item" href="/">Computers</a></li>
    <li><a className="dropdown-item" href="/">Electronics</a></li>
    <li><a className="dropdown-item" href="/">Games</a></li>
    <li><a className="dropdown-item" href="/">Garden</a></li>
    <li><a className="dropdown-item" href="/">Grocery</a></li>
    <li><a className="dropdown-item" href="/">Health</a></li>
    <li><a className="dropdown-item" href="/">Home</a></li>
    <li><a className="dropdown-item" href="/">Industrial</a></li>
    <li><a className="dropdown-item" href="/">Jewelry</a></li>
    <li><a className="dropdown-item" href="/">Kids</a></li>
    <li><a className="dropdown-item" href="/">Movies</a></li>
    <li><a className="dropdown-item" href="/">Music</a></li>
    <li><a className="dropdown-item" href="/">Outdoors</a></li>
    <li><a className="dropdown-item" href="/">Shoes</a></li>
    <li><a className="dropdown-item" href="/">Sports</a></li>
    <li><a className="dropdown-item" href="/">Tools</a></li>
    <li><a className="dropdown-item" href="/">Toys</a></li>

  </ul>

</div>

<div class="input-group mb-3">
  <input type="text" className="form-control" aria-label="Text input with dropdown button" />
  <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Sort by Price</button>
  <ul className="dropdown-menu dropdown-menu-end">
  <li><a className="dropdown-item" href="/">Highest</a></li>
    <li><a className="dropdown-item" href="/">Lowest</a></li>
  </ul>
</div>

</div>
  );
}

export default SearchBar;