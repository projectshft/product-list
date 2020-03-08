import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchPrice } from '../actions/index';

function PriceSearch(props) {
  const sortByPrice = function (event) {
      console.log(event.target.value)
    props.searchPrice(`&price=${event.target.value}`)
  }

  return (
    <div className="row row-cols-3 w-75 p-3" style={{flexWrap: "nowrap"}}>
    <form className="input-group form-control-sm" style={{margin: "10px", padding: "0px"}}>
    <select onChange={sortByPrice} className="custom-select custom-select-sm">
        <option value="Price">Price</option>
        <option value="Highest">Highest to Lowest</option>
        <option value="Lowest">Lowest to Highest</option>
      </select>
    </form>
  </div>
  )
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchPrice }, dispatch);
}

export default connect(null, mapDispatchToProps)(PriceSearch);