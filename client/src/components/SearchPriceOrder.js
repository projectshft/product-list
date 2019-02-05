import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import PropTypes from 'prop-types';

class SearchPriceOrder extends Component {
    render() {
      return (
        //This is the search drop down menu that will enable you to sort by price order, either in ascending or descending order.
        <div className="search-bar" align="right">
        {/* //This is the label of the Price Order drop down menu */}
        <label>Sort Price by: </label>
        <select text="Search for a category" onChange={this.props.SearchPrice}>      
        {/* //This enables you to choose between sort by lowest price (ascending order) or by highest price (descending order). The blank option meanwhile, enables you to go back to how the pages originally were set. */}
            <option></option> 
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