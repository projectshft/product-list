import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from "react";
import PropTypes from 'prop-types';

class SearchBarProduct extends Component {
    render() {
      return (
        <div className="search-bar">
        <label>search: </label>
          <input type="text"
              placeholder="search for a product"
              onChange={this.props.SearchProducts}>
            </input>               
        </div>    
         
        
      );
    }
    onInputChange(term) {
        this.setState({ term });
        this.props.onSearchTermChange(term);
      }
    }
    
    SearchBarProduct.propTypes = {
      onSearchTermChange: PropTypes.func
    }
    
    export default SearchBarProduct;