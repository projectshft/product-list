import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../actions'

class ProductsList extends Component {
  //use lifecycle method to fetchProducts from our API at the start
  componentDidMount() {
    this.props.fetchProducts()
  }

  renderProducts() {
    return _.map(this.props.products, product => {
      return (
        <div className="col-12">
          <div className="row">
            <li className="list-group-item col-3" key={product._id}>
              <div className="row">
                <span className="offset-md-1">
                  {' '}
                  Category: {product.category}{' '}
                </span>
                <span className="offset-md-3"> ${product.price} </span>
              </div>

              <div className="">
                <img
                  className=" img-responsive"
                  src={product.image}
                  alt="your friend"
                />
                <span className=""> {product.name} </span>
              </div>
            </li>
          </div>
        </div>
      )
    })
  }

  render() {
    return (
      <section className="full-page padding-lg">
        <div className="container" style={{ marginTop: '75px' }}>
          <div>{this.renderProducts()} </div>
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
)(ProductsList)
