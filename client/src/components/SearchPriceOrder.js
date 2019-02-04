import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import PropTypes from 'prop-types';

class SearchPriceOrder extends Component {
    render() {
      return (
        <div className="search-bar">
        <label>Price Order: </label>
        <select text="Search for a category" onChange={this.props.SearchPrice}>
         
         <option> </option> 
        <option>lowest</option>   
        <option>highest</option>

    
        </select>           
        </div>    
         
        
      );
    }
    onInputChange(term) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
      }
    }
    
    SearchPriceOrder.propTypes = {
      onSearchTermChange: PropTypes.func
    }
    
    export default SearchPriceOrder;