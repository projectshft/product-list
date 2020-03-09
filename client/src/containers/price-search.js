import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProductsByPrice } from '../actions/index';

function PriceSearch( props) {
    const sortByPrice = function (event) {
      console.log(event.target.value)
      props.fetchProductsByPrice(`${event.target.value}`)
    } 
      
    return (
        <div className="col-md-3">
        <form className="input-group form-control-sm" style={{margin: "10px", padding: "0px"}}>
        <select onChange={sortByPrice} className="custom-select custom-select-sm">
            <option value="null">Price</option>
            <option value="highest">Highest to Lowest</option>
            <option value="lowest">Lowest to Highest</option>
        </select>
        </form>
    </div>
    )
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProductsByPrice }, dispatch);
}

export default connect(null, mapDispatchToProps)(PriceSearch);