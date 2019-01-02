import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { getProducts } from '../actions'
import { connect } from 'react-redux.1';

//searching is ONLY required for extension 2;

  class SearchBar extends Component {

    filterCategory = e => {
      let category = document.querySelector('#category').value;
      this.props.getProducts({category})
    }

    sortByPrice = e => {
      let price = document.querySelector('#price').value;
      this.props.getProducts({price})
    }

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
                  <select id='category' onChange={event =>this.filterCategory()}>
                    <option value = "">Choose Category</option>
                    <option value = "Jewelry">Jewelry</option>
                    <option value = "Home">Home</option>
                    <option value = "Grocery">Grocery</option>
                    <option value = "Music">Music</option>
                    <option value = "Books">Books</option>
                    <option value = "Electronics">Electronics</option>
                    <option value = "Kids">Kids</option>
                    <option value = "Automotive">Automotive</option>
                    <option value = "Toys">Toys</option>
                    <option value = "Tools">Tools</option>
                    <option value = "Games">Games</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="price-sorting">Sort By:</label>  
                  <select id="price" onChange={event =>this.sortByPrice()}>
                    <option value = "">None</option>
                    <option value = "lowest">Price: Low to High</option>
                    <option value = "highest">Price: High to Low</option>
                  </select>
                </div>
              </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProducts }, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar);