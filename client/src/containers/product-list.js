import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux.1'
import {displayCurrentProducts} from '../actions/types'
import { bindActionCreators } from 'redux';

class ProductList extends Component {
  // let category = product.category.charAt(0).toUpperCase() + product.category.slice(1);
  renderProducts() {
  return this.props.products.map(product => {
    return (
        <div className="col-md-4" key={product._id}>
          <span className="category-display">Category: {product.category}</span>
          <span className='price-display'>${product.price}</span>
          <img src={product.image} alt={product.name} className="thumbnail"></img>
          <p className="product-name-display">{product.name}</p>
        </div>
      )
      // <ProductListItem key={product._id} product={product}/>
  })
}
  render() {
  return (
    <div className="container container-fluid">
     <div className="row" id="list-of-matches">
     <>
        { this.renderProducts() }
      </>
      </div>
    </div>
  )
}
}


function mapStateToProps(state) {
  console.log(state.products.products)
  return {products: state.products.products}
}



export default connect(mapStateToProps)(ProductList);