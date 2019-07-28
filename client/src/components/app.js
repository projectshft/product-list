import React, { Component } from "react";
import { fetchProducts } from '../actions/index'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Product from './product'

class App extends Component {

  componentDidMount() {
    this.props.fetchProducts();
  };

  renderProducts() {
    if (this.props.products.products) {
      console.log(this.props.products.products)
      return (
        this.props.products.products.map((product, index) => {
          return <Product product={product} key={product._id}/>
        })
 
      )
    } else {
      return (
        <div>Loading</div>
      )
    }
  }

  render() {
    return (
      <div>
        <div>Products</div>
        <div className="products">
          {this.renderProducts()}
        </div>
      </div>
  )};
}

function mapStateToProps({products}) {
  return {products}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchProducts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)