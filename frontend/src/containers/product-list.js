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
      <div className="col-md-4 ">
        <div class="d-flex justify-content-between">
            <p className="text-left">Category: {productData.category}</p>
            <p className="text-right"> {productData.price}</p>
          </div>
        <img className=" mx-auto d-block" src="https://via.placeholder.com/250?text=Product+Image"></img>
        <p className="text-center">{productData.name}</p>
  
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="product row ">{this.props.products.map(this.renderProducts)}</div>
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