import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts, getCategory } from '../actions/index.js';


function mapStateToProps(state) {
    return {     
      search: state.search,
      sort: state.sort,
      category: state.category,
      page: state.page
    }; 
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts, getCategory }, dispatch);
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(Categories);