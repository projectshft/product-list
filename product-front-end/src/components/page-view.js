import React, { Component } from 'react'
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { fetchProducts, getCount } from '../actions'
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.css'
import './main.css'

class Products extends Component {

  render() {
    return (
      <div className="container-fluid">
        <h2 className="text-center my-5">Products</h2>
        <button onClick={()=>{this.props.fetchProducts()}}>get products</button>
        <button onClick={()=>{this.props.getCount()}}>get count</button>
        <div className="row">
          {
            this.props.products.map((product, i) => {
              return (
                <div key={i} className="col-sm-4">
                  <p className="category">category: {product.category}</p>
                  <img className="img-fluid product-image" src={product.image} alt={product.name} />
                  <h4>{product.title}</h4>
                  <div className="text-center">
                    <button href={`/${product.id}`} type="button" className="btn btn-outline-primary btn-dark text-uppercase">Add to Cart</button>
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
  return { products: state.products, count: state.count };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts: fetchProducts, getCount:getCount }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Products);
