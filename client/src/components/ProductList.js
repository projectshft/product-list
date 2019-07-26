import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions';
import { bindActionCreators } from 'redux';
import Product from './Product';

class ProductList extends Component {
  //make sure it isn't empty
  componentDidMount(){
    this.props.fetchProducts();
  }

  renderProducts(){
    console.log(this.props)
    return _.map(this.props.products, product => {
      return(
        <Product key={product._id} product={product}/>
      )
    })
  }
  render(){
    return (
      <div>{this.renderProducts()}</div>
    )
}
}

  function mapStateToProps(state) {
    return { products: state.products }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
  }

  export default connect(mapStateToProps, mapDispatchToProps)(ProductList);