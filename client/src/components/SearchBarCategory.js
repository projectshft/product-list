import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import PropTypes from 'prop-types';

class SearchBarCategory extends Component {
    render() {
      return (
        <div className="search-bar">
        <label>Category Search: </label>
        <select text="Search for a category" onChange={this.props.SearchCategory}>
         
         <option disabled selected value> -- select an option -- </option> 
         <option>All Categories</option> 
        <option>Automative</option>   
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
        <option>Jewelry</option> 
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