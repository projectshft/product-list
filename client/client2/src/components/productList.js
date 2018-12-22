import React, { Component } from 'react'
import _ from "lodash";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import {fetchProducts} from '../actions'
import Product from './singleProduct'

export class ProductList extends Component {
  componentDidMount (){
    //somehow get the products on the state
    const {fetchProducts} = this.props;
    // fetchProducts()
   
  }
  renderProducts = () => {

    return this.props.products.map(item => {
      return <Product productItemAsProps={item} />;
    });
    
  }

  render() {
   
    return <div className="container">
        <div className="row">
          {this.renderProducts()}
        </div>
      </div>;
  }
}


const mapStateToProps = (state) => ({
  products: state.products
})


const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchProducts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
