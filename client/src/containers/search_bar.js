import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { getProducts, updateCategory, updatePrice } from '../actions'
import { connect } from 'react-redux';


//searching is ONLY required for extension 2;

  class SearchBar extends Component {

    filterCategory = e => {
      let category = document.querySelector('#category').value;
      this.props.updateCategory(category)
      this.props.getProducts(this.props.page, category, this.props.price)
    }

    sortByPrice = e => {
      let price = document.querySelector('#price').value;
      this.props.updatePrice(price)
      this.props.getProducts(this.props.page, this.props.category, price)
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
                    <option value = "Jewelery">Jewelry</option> {/* The British spelling really bugs me */}
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
                    <option value = "Garden">Garden</option>
                    <option value = "Shoes">Shoes</option>
                    <option value = "Baby">Baby</option>
                    <option value = "Beauty">Beauty</option>
                    <option value = "Health">Health</option>
                    <option value = "Outdoors">Outdoors</option>
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

function mapStateToProps(state) {
  console.log(state.products.category)
  return {category: state.products.category, price: state.products.price, page: state.products.page}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProducts, updateCategory, updatePrice }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);