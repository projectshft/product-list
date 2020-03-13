import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts, searchPrice  } from "../actions/index";

function PriceSearch(props) {
  const sortByPrice = (e) => {
    props.searchPrice(`&price=${e.target.value}`)
  }

  return (
    <div className='col'>
      <select onChange={sortByPrice} className="custom-select custom-select-sm">
        <option value="Price">Price</option>
        <option value="Highest">Highest to Lowest</option>
        <option value="Lowest">Lowest to Highest</option>
      </select>
    </div>
  )
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts, searchPrice }, dispatch);
}

export default connect(null, mapDispatchToProps)(PriceSearch);