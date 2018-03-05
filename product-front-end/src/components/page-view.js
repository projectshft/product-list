import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { fetchProducts, getCount } from '../actions'
import 'bootstrap/dist/css/bootstrap.css'
import './main.css'

class Products extends Component {
  constructor(props) {
    super(props)

    this.props.fetchProducts(this.props.query)

  }

  render() {

    return (
      <div className="container-fluid">
        <h2 className="text-center my-5">Products</h2>
        <div className="row">
          {
            this.props.products.map((product, i) => {
              return (
                <div key={i} className="mb-5 col-sm-4 d-flex flex-column">
                  <div className="product-image flex-column d-flex justify-content-center">
                    <span><span className="mt-2 category pull-left">category: {product.category}</span><span className="price pull-right">${product.price}</span></span>
                    <img className="img-fluid flex-column d-flex" src={product.image} alt={product.name} />
                  </div>


                  <div className="text-center d-flex flex-column justify-content-center">
                    <h4>{product.name}</h4>
                    <button href={`/${product.id}`} type="button" className="btn btn-outline-primary btn-dark text-uppercase product-image">Add to Cart</button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { products: state.products, pages: state.pages, query: state.query };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts: fetchProducts, getCount:getCount }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Products);
