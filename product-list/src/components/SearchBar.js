import React, { Component } from "react";

class SearchBar extends Component {
  constructor() {
    super()

  }

  render() {
    return (
      <div>
        <form>
          <label>Search</label>
          <input type="search"></input>
          
          <label>Filter by Category</label>
          <input type="text"></input>

          <label>sort by:</label>
          <input type="text"></input>
        </form>
      </div>
    )
  }

}

export default SearchBar;

