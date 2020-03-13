import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts, searchCategory } from "../actions/index";

function CategorySearch(props){
      //console.log('from category props: ', props)
      const getCategory = (e) => {
        props.searchCategory(`&category=${ e.target.value }`)
      }
      return (
        <div className='col'>
          <select onChange={getCategory} className="custom-select custom-select-sm">
            <option value="Categories">Categories</option>
            <option value="Grocery">Grocery</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>
      )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts, searchCategory }, dispatch);
}

export default connect(null, mapDispatchToProps)(CategorySearch);