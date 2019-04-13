import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../actions'

class ProductsList extends Component {
  //use lifecycle method to fetchProducts from our API at the start
  componentDidMount() {
    this.props.fetchProducts()
  }

  renderProducts() {
    console.log('this.props', this.props)
    return this.props.products.map(product => {
      return (
        <li className="list-group-item" key={product.id}>
          <div className="row w-100">
            <div className="col-12 col-sm-6 col-md-3 px-0">
              <img
                src={product.image}
                style={{
                  objectFit: 'cover'
                }}
                alt="your friend"
              />
            </div>
            <label className="name lead"> {product.name} </label>
            <span className="text-muted"> {product.category} </span>
            <span className="text-muted small"> {product.price} </span>
          </div>
        </li>
      )
    })
  }

  render() {
    return <div>{this.renderProducts()} </div>
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
