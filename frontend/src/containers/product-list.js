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
      <div className="col-md-4 pt-2 mb-4 border">
        <div className="row d-flex ">
          <div className="col-sm-9 mx-auto d-block">
            <div class="d-flex justify-content-between ">
            <p className="text-left mb-0">Category: {productData.category} </p>
            <p className="text-right mb-0">${productData.price}</p>
            </div>
          </div>
         </div>
        <img className="img-fluid mx-auto d-block pb-1 pb-2" src="https://via.placeholder.com/250?text=Product+Image"></img>
 
      <h5 className="text-center">{productData.name}</h5>
  
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