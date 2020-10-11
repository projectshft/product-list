import React, { Component } from 'react';

class CategoryDropdown extends Component {
  
  render() {
    return (
      <span>
        <select
          id='dropdowncategories'
          className='select-category'
          placeholder='Select category'
          value={this.props.category}
          onChange={this.props.setCategory}>
          <option defaultValue>Select a category</option>
          <option value='Baby'>Baby</option>
          <option value='Beauty'>Beauty</option>
          <option value='Books'>Books</option>
          <option value='Clothing'>Clothing</option>
          <option value='Computers'>Computers</option>
          <option value='Electronics'>Electronics</option>
          <option value='Games'>Games</option>
          <option value='Garden'>Garden</option>
          <option value='Grocery'>Grocery</option>
          <option value='Health'>Health</option>
          <option value='Home'>Home</option>
          <option value='Industrial'>Industrial</option>
          <option value='Jewelery'>Jewelery</option>
          <option value='Kids'>Kids</option>
          <option value='Music'>Music</option>
          <option value='Outdoors'>Outdoors</option>
          <option value='Shoes'>Shoes</option>
          <option value='Sports'>Sports</option>
          <option value='Tools'>Tools</option>
          <option value='Toys'>Toys</option>
        </select>
      </span>
    );
  }
}


export default CategoryDropdown;