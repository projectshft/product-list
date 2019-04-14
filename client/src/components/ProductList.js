import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../actions';

class ProductList extends Component {
  renderProducts = products => {
    return products.map(product => {
      return (
        <div key={product._id} className="col-lg-4 col-md-6 my-3">
          <div className="card shadow m-auto" style={{ width: '18rem' }}>
            <p className="card-text mx-3 mt-3">
              <em>{product.category}</em>
              <span className="h5 float-right">${product.price}</span>
            </p>
            <img
              src={product.image}
              className="card-img-top"
              alt="Not available"
            />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">
                {product.reviews.length > 0
                  ? product.reviews[0].text.substring(0, 25) + ' ...'
                  : 'No reviews yet.'}
              </p>
              <button className="btn btn-primary btn-block">
                I don't do anything yet
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-4 mb-2">
          {this.renderProducts(this.props.products)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { products } = state.products;
  return {
    products
  };
};

ProductList.propTypes = {
  products: PropTypes.array,
  getProducts: PropTypes.func
};

export default connect(
  mapStateToProps,
  { getProducts }
)(ProductList);
