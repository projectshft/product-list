import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions';
import { bindActionCreators } from 'redux';
import Product from './Product';

class ProductList extends Component {
  //first request on page load
  componentDidMount(){
  let sort = '';
  let category='';
  let page = 1;
    this.props.fetchProducts(page, sort, category);
  }

  renderProducts(){
    return _.map(this.props.products, product => {
      return(
        <div className='col-md-4'>
          <Product key={product._id} product={product}/>
        </div>
      )
    })
  }
  render(){
    return (
      <div className='container'>
        <div className='row'>
          {this.renderProducts()}
        </div>
      </div>
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