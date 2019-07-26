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
        <h1 className="card-title">
          {product.name}
        </h1>
        <img src={product.image} class="card-img-top" alt="sweet product"></img>
      </div>
      <div className='card-footer'>
        ${product.price}
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
