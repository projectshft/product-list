import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { SORT, FILTER_BY_CATEGORY } from '../actions/types'
import { connect } from 'react-redux.1';

//searching is ONLY required for extension 2;

  class SearchBar extends Component {
    render() {
    return (
      <div className="container-fluid">
        <div className="row form-group">
            <div className="search-bar input-group col">
              <div className="col-md-4">
                <input type = "text" placeholder="Search" />
              </div>
                <div className="col-md-4">
                  <label htmlFor="category-selection">Filter By Category:</label>
                  <select>
                    <option value = "Default">Choose Category</option>
                    <option value = "Jewelry">Jewelry</option>
                    <option value = "Home">Home</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="price-sorting">Sort By:</label>  
                  <select>
                    <option value = "Default">None</option>
                    <option value = "Lowest">Price: Low to High</option>
                    <option value = "Highest">Price: High to Low</option>
                  </select>
                </div>
              </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ SORT, FILTER_BY_CATEGORY}, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar);