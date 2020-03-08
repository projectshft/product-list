import React, { Component } from 'react';
import { searchProducts } from '../actions';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ProductGrid from './ProductGrid';
import SearchBar from './SearchBar';
import DropdownMenuReact from './DropdownMenuReact';
import DropdownMenuPrice from './DropdownMenuPrice';
import Pagination from './Pagination';

class App extends Component {
 

  componentDidMount() {
    
  }

  render() {
    

    return (
      <div className='container main-app'>
        <div className='section-title text-center border-bottom'>
          <h1>Welcome to the Project Shift Store</h1>
        </div>
        <div className='row mb-4'>
          <div className='col-md-5 mr-1'>
            <SearchBar />
          </div>
          <div className='col-md-6'>
            <div className='dropdown-menu-wrap'>
              <DropdownMenuReact />
              <DropdownMenuPrice />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-10 offset-md-1'>
            
            <ProductGrid />
            <Pagination />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
   
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);