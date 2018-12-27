import React, { Component } from "react";
import SortByCategory from './sort_by_category';

class SearchAndSort extends Component {
   render() {
      return (
         <nav className="navbar navbar-light bg-light">
            <form className="form-inline">
               <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
               />
               <button className="btn btn-outline-success" type="submit">
                  Search
               </button>
            </form>
            <div>
            <label for='category'>Filter by Category: 
               <select id="category">
                  <option value="">All Products</option>
                  <SortByCategory />
               </select>
            </label>
            </div>
            <div>
               <label for='price'>Filter by Price: 
                  <select id="price">
                     <option value=''>No filter</option>
                     <option value="Asc">Low to High</option>
                     <option value="Des">High to Low</option>
                  </select>
               </label>
            </div>
         </nav>
      );
   }
}

export default SearchAndSort;