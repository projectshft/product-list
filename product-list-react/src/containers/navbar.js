import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchBar from './search-bar';
import Categories from './categories';
import SortBy from './sortBy';

import { fetchProducts } from '../actions/index';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '', category: '', sortBy: '' };
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1 className="title">PRODUCTS</h1>
        </div>
        <div className="row navbar-container">
          <div className="col-md-4 navbar-item-container">
            <SearchBar />
          </div>
          <div className="col-md-4 navbar-item-container">
            <Categories />
          </div>
          <div className="col-md-4 navbar-item-container">
            <SortBy />
          </div>



        </div>
      </div>

    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchProducts }, dispatch);
// }

// function mapStateToProps(state) {
//   return {
//     term: state.term,
//     category: state.category,
//     sortBy: state.sortBy
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(NavBar);
