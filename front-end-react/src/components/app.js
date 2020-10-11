import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';

import SearchBar from '../containers/search-bar';
import ProductList from '../containers/product-list';
import CategoryDropdown from '../containers/category-dropdown';
import SortProducts from '../containers/sort-products';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { search: '', category: '', sort: '' };
    // binding not needed bc use ES6 arrow functions below
  }

  setCategory = (event) => {
    //setState is async. Use second parameter function that runs after state is set
    this.setState({ category: event.target.value }, function () {
      this.props.fetchProducts(this.state.search, this.state.category, this.state.sort, '');
    });
  };

  onSearchInputChange = (event) => {
    this.setState({ search: event.target.value });
  };

  onSearchFormSubmit = (event) => {
    event.preventDefault();
    this.props.fetchProducts(this.state.search, this.state.category, this.state.sort, '');
  };

  setSort = (event) => {
    //setState is async. Use second parameter function that runs after state is set
    this.setState({ sort: event.target.value }, function () {
      this.props.fetchProducts(this.state.search, this.state.category, this.state.sort, '');
    });
  };

  onRefreshBtnClick = () => {
    this.props.fetchProducts('', '', '', '');
    //HOW TO return dropdowns to their default values?
  };

  render() {
    return (
      <div>
        <div className='row nav-bar'>
          <div className='col-sm-6'>
            <SearchBar
              search={this.state.search}
              onSearchInputChange={this.onSearchInputChange}
              onSearchFormSubmit={this.onSearchFormSubmit}
            />
          </div>
          <div className='col-sm-3'>
            <CategoryDropdown
              category={this.state.category}
              setCategory={this.setCategory}
            />
          </div>
          <div className='col-sm-3'>
            <SortProducts
              sort={this.state.sort}
              setSort={this.setSort}
              onRefreshBtnClick={this.onRefreshBtnClick}
            />
          </div>
        </div>
        <ProductList />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);

