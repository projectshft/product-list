import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../Actions';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import SortOptions from './SortOptions';

const SearchOptions = ({ categories, sortedByPrice, fetchProducts }) => (
  <div className='container'>
    <div className='row'>
      <SearchBar />
      <CategoryFilter 
        categories={categories} 
        sortedByPrice={sortedByPrice}
        fetchProducts={fetchProducts}
      />
      <SortOptions
        sortedByPrice={sortedByPrice}
        fetchProducts={fetchProducts}
      />
    </div>
  </div>
);

//for now leave out search query, add for extension
function mapStateToProps(state) {
  return {
    categories: state.productData.categories,
    sortedByPrice: state.productData.sortedByPrice
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchOptions);