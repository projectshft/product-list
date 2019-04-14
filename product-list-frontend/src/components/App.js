import React, { Component } from "react";
import ProductView from "./ProductView";
import SortByDropdown from "./SortByDropdown";
import CategoryDropdown from "./CategoryDropdown";
import { loadProducts } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends Component {
  constructor(props) {
    super(props);

  }

  onClickPageNumber(e) {
    const clickedPage = e.currentTarget.textContent;
    this.props.loadProducts(null, null, clickedPage)
  }

  pagination() {
    const pages = [];
    if (this.props.products.pagesCount) {
    for (let i=0;i<this.props.products.pagesCount;i++) {
        pages.push(i);
    }
  } else {
    return (
      <div>Loading...</div>
    )
  }

  return pages.map(page => {
    return (
      <li onClick={this.onClickPageNumber.bind(this)}>{page+1}</li>
    )
  })
  }

  render() {
    return (
      <div className="container-fluid">
      <h1 align="center">PRODUCTS</h1>
      <div className="d-flex">
      <div className="flex-fill-search">
      <form>
      <div className="input-group">
      <button type="button" className="btn btn-primary">Search</button>
      <input type="text" className="form-control" id="searchVal"></input>
      </div>
      </form>
      </div>
      <div className="flex-fill-categories">
        <CategoryDropdown />
        </div>
        <div className="flex-fill-sortby">
        <SortByDropdown />
        </div>
        </div>
        <ProductView />
        <div>
          <ul className="pages">
        {this.pagination()}
        </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ products }) {
  return { products };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { loadProducts},
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);