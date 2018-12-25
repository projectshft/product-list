import React, { Component } from "react";
import { Link } from 'react-router-dom'
import { Badge } from "reactstrap";
import {FaSearch} from 'react-icons/fa'
import { bindActionCreators } from "redux";
import { addCart } from '../actions/addCart';
import { getCart } from "../actions/getCart";

import { connect } from "react-redux";



/*=====================================================
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: "", dropdownOpen: false, category: "All", sortByPrice: 1, page: 1, cartHidden: true, username: "Chelsea.Runolfsdottir", passphrase: "50zTjGKHp7ij43p" };
  }

=====================================================*/

class Product extends Component  {
  constructor(props) {
    super(props);
  }
  addAndGetCart = async  (token, id) => {
    await this.props.addCart(token,id)
    await this.props.getCart(token)
  }

  render () {
    let product = this.props.productItemAsProps

  return (<div className="col-md-4">
      <div className="productCard" data-id={product._id}>
        <div className="product">
          <h1>{product.name}</h1>
          <h2>${product.price}</h2>
          <img src={product.image} />
          <br/>
          <Badge><FaSearch /> {product.category}</Badge>
          <p>{product.description}</p>
          <div className="reviewBtn">
            <Link to={`/products/${product._id}`}>Reviews</Link>
          <button className="btn btn-confirm" onClick={() => this.addAndGetCart(this.props.user.id,product._id)}>
            Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
    )
}
}


const mapStateToProps = (state) => ({
  cart: state.cart,
  user: state.user
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addCart, getCart }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Product)
