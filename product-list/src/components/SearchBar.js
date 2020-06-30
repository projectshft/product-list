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
          <select id="cars" name="cars">
            <option value="highest">highest</option>
            <option value="lowest">lowest</option>
          </select>

        </form>
      </div>
    )
  }

}

export default SearchBar;

