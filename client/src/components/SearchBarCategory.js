import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import PropTypes from 'prop-types';

class SearchBarCategory extends Component {
    render() {
      return (
        //The class creates a search bar that will become a drop down menu of all the categories that have products in them. 
        <div className="search-bar" align="center">
        <label>Filter by Category: </label>
        <select text="Search for a category" onChange={this.props.SearchCategory}>
         {/* These are all the categories that you can choose from. The first option allows you to look for all Products and the reason I did not say All Products is because that would have caused it to think All Products is a category when it really is not. To know that it truly is not a category, I had to leave it blank.            */}
          <option></option> 
          <option>Automotive</option>   
          <option>Beauty</option>
          <option>Books</option> 
          <option>Clothing</option>
          <option>Computers</option>
          <option>Electronics</option>   
          <option>Games</option>        
          <option>Garden</option> 
          <option>Grocery</option>
          <option>Health</option>     
          <option>Home</option>       
          <option>Industrial</option>
          <option>Jewelery</option> 
          <option>Kids</option>
          <option>Movies</option> 
          <option>Music</option> 
          <option>Outdoors</option> 
          <option>Shoes</option> 
          <option>Sports</option>
          <option>Tools</option>
          <option>Toys</option>
    
        </select>           
        </div>    
         
        
      );
    }
    onInputChange(term) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
      }
    }
    
    SearchBarCategory.propTypes = {
      onSearchTermChange: PropTypes.func
    }
    
    export default SearchBarCategory;