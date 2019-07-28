import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../Actions';

const SearchOptions = () => (
  <div className='container'>
    <div className='row'>
      needs search bar, category, sort
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

export default connect(mapStateToProps, null)(SearchOptions);