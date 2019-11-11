import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../actions'

class Products extends Component {
  //use lifecycle method to fetchProducts from our API at the start
  componentDidMount() {
    this.props.fetchProducts()
  }

  renderProducts() {
    return _.map(this.props.products, product => {
      return (
        <div
          className="card col-xs-12 col-sm-5 col-md-3 shadow-sm"
          style={{ display: 'inline-block', margin: '2%' }}
          key={product._id}
        >
          <div className="card-body">
            <div className="row">
              <span className="card-text"> Category: {product.category} </span>
              <h6 className="card-text pl-3"> ${product.price} </h6>
            </div>

            <div className="row">
              <img
                className="card-img img-responsive pt-2 pb-2"
                src={product.image}
                alt="your friend"
              />
            </div>
            <div className="row">
              <h5 className="card-title"> {product.name} </h5>
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <section className="full-page padding-lg">
        <div className="container" style={{ marginTop: '220px' }}>
          <div className="col-12">
            <div className="row" />
            <div>{this.renderProducts()} </div>
          </div>
        </div>
      </section>
    )
  }
}
//make all of our products from our Redux store available to the component's props
function mapStateToProps(state) {
  return { products: state.products }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch)
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products)