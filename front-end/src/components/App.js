import React, { Fragment, Component } from 'react';
import ProductCard from './product_card';
import SearchInformation from './search_information';
import SearchAndSortBar from './search_and_sort';
import Pagination from './pagination';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <h1 className="mx-auto">Project Shift Store</h1>
        </div>
        <SearchAndSortBar />
        <SearchInformation />
        <div className="container">
          <div className="row">
            <ProductCard />
          </div>
        </div>
        <Pagination />
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
