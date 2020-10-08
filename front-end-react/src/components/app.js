import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import SearchBar from '../containers/search-bar';
// import CategoryDropDown from '../containers/category-dropdown';
// import SortDropDown from '../containers/sort-dropdown';
// import Pagination from '../containers/pagination';
import ProductList from '../containers/product-list';
import {fetchProducts} from "../actions";

class App extends Component {
  componentDidMount() {

    this.props.fetchProducts();
  }

  render() {
    return (
      <div>
       <ProductList />
      </div>
    );
  }
}

function mapStateToProps({ products }) {
  return { products };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
