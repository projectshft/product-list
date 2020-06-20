import React from 'react';
import { Component } from 'react';


//dropdowns can be a button if needed
/*another option if needed:
        <div class="dropdown-menu">
          <h6 class="dropdown-header">Dropdown header</h6>
          <a class="dropdown-item" href="#">Action</a> 
          <a class="dropdown-item" href="#">Another action</a>
        </div>

From bootstrap docs:
Form controls
Textual form controls—like <input>s, <select>s, and <textarea>s—are styled with the .form-control class. Included are styles for general appearance, focus state, sizing, and more.
Be sure to explore our custom forms to further style <select>s.  

Where do we make our row? another outer div with class="row"?
 */
export default class SearchFilterSortBar extends Component {
  render() {
    return (
      <form className="form-inline">
        <label className="ml-2 mr-2" htmlFor="exampleFormControlInput1">Search</label>
        <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Search..." />
        <label className="ml-2 mr-2" htmlFor="inlineFormCustomSelectCategory">Filter by Category: </label>
        <select className="form-control custom-select" id="inlineFormCustomSelectCategory">
          <option defaultValue="All">All</option>
          <option value="Home">Baby</option>
          <option value="Baby">Books</option>
          <option value="Garden">Grocery</option>
          <option value="Home">Clothing</option>
          <option value="Baby">Tools</option>
          <option value="Garden">Kids</option>
          <option value="Home">Home</option>
          <option value="Baby">Garden</option>
          <option value="Garden">Automotive</option>
          <option value="Home">Toys</option>
          <option value="Baby">Beauty</option>
          <option value="Garden">Computers</option>
          <option value="Home">Sports</option>
          <option value="Baby">Shoes</option>
          <option value="Garden">Games</option>
          <option value="Home">Jewelry</option>
          <option value="Baby">Electronics</option>
          <option value="Garden">Industrial</option>
          <option value="Garden">Movies</option>
          <option value="Home">Music</option>
          <option value="Baby">Health</option>
          <option value="Garden">Outdoors</option>
        </select>
        <label className="ml-2 mr-2" htmlFor="inlineFormCustomSelectSort">Sort by Price: </label>
        <select className="form-control custom-select" htmlFor="inlineFormCustomSelectSort">
          <option selected>Sort Type</option>
          <option value="Highest">Price: Low to High</option>
          <option value="Lowest">Price: High to Low</option>
        </select>
      </form>
    );
  }
}