import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/index';

class ProductList extends Component {

  componentDidMount() {

    this.props.fetchProducts();
 }

  renderProducts(productData) {
    
    return (
      <div className="container border p-2">
            <p>{productData.name}</p>
            <p>Category: {productData.category}</p>
            <p>{productData.price}</p>

      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="product">{this.props.products.map(this.renderProducts)}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { products: state.products };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);