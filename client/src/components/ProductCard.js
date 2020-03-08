import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  } from '../actions/index';
 
const ProductCard = ({ product }) => {

  return (
    <div
      className='card text-center align-middle text-black bg-light border-light shadow'
      onClick={e => {
      }}
    >
      <div className="card-body">
        <h5 className="card-title">
          {product.name}
        </h5>
        <img src={product.image} className="card-img-top" alt="oyster images stink"></img>
      </div>
      <div className='card-footer'>
        Category: {product.category} | <b>${product.price}</b>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({  }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(ProductCard);