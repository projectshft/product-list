import React, { Component } from 'react';
import { initialSearch } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductGrid from './ProductGrid';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.initializeSearch();
  }

  render() {
    if (!this.props.products) {
      return (
        <div className='container'>
          <div className='jumbotron'>
            <h1>Nothing to see here yet... hold please...</h1>
          </div>
        </div>
      );
    }

    return (
      <div className='container main-app'>
        <div className='jumbotron'>
          <h3>PRODUCTS</h3>
        </div>
        <div className='row'>
          <div className='col-md-5'>
            <SearchBar />
          </div>
          <div className='col-md-7'>
            <FilterDropdown type={this.props.categories}/>
            
          </div>
        </div>
        <div className='row'>
          <div className='col-md-10 offset-md-1'>
            <ProductGrid products={this.props.products} />
            
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ initialSearch }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);