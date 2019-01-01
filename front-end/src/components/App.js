import React, { Fragment, Component } from 'react';
import ProductCard from './product_card';
import SearchInformation from './search_information';
import SearchAndSortBar from './search_and_sort';
import Pagination from './pagination';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from '../actions';

class App extends Component {

  // Populate app at start-up with products from all categories, sorted from lowest to highest price.
  componentDidMount() {
    this.props.fetchProducts({price:'lowest'});
  }

  /*
  Component Description:
  <SearchAndSortBar /> -- Accepts user search input, filter by category, and filter by price options
      <SortByCategory /> -- List of categories from the database to auto-populate the UI category drop-down
  <SearchInformation /> -- UI to give user information about the search results
  <ProductCard /> -- A card of each product, with name, category, price, and image
  <Pagination /> -- Clickable page numbers auto-populated by the search results

  storeState:
  "params" are state from the UI selections. "products" are state from data served by the API.
  {
    params: {
      category: String,
      page: Number,
      price: String,
      search: String
    }
    products: {
      categories: [Strings],
      current_page: Number,
      number_items: Number,
      number_pages: Number
      products: [Product Objects]
    }
  }
  */
 
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
