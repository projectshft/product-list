import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts, GET_CATEGORY } from '../actions/index.js';


function mapStateToProps(state) {
    return {     
      searchTerm: state.searchTerm,
      sort: state.sort,
      category: state.category,
      page: state.page
    }; 
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts, getCategory }, dispatch);
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Categories);