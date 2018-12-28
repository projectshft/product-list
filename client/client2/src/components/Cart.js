import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Button, ButtonGroup } from "reactstrap";
import { Link } from 'react-router-dom'
import { ListGroup, ListGroupItem } from "reactstrap";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { getCart } from '../actions/getCart'
import { addCart } from '../actions/addCart'
import { deleteCart } from "../actions/deleteCart";



export class Cart extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      cartHidden:true
    }
  }
  componentDidMount() {
    const {getCart} = this.props
    getCart(this.props.user.id);
  }  
  _reduceCart (cartArray) {
    console.log(cartArray)
    let reducedCart = []
  cartArray.forEach((currentItem) => {
    let thisItem = reducedCart.find(reducedCartItem => reducedCartItem.name === currentItem.name)
    if(!thisItem){
      currentItem.quantity = 1;
      reducedCart.push(currentItem)
    } else {
      thisItem.quantity ++
    }
  })
  console.log(reducedCart)
  return reducedCart
  }
  renderCartItems (cartArray) {
    let reducedCart = this._reduceCart(cartArray)
    return reducedCart.map(cartItem => {
      return (
          <ListGroupItem className="cart-item">
          <Link to={`/products/${cartItem._id}`}>

            <h5>{cartItem.name}</h5>
            <img src={cartItem.image} height="50px" width="50px" />
            <p>{cartItem.description}</p>
            <p>X {cartItem.quantity}</p>
             </Link>
            <button onClick={()=> this.props.deleteCart(this.props.user.id, cartItem._id)} className="btn btn-danger">X</button>
          </ListGroupItem >
      )
       ;
    })
  }

  render() {
    console.log(this.props,"cart")
    if(this.props.user.user){
    return (
      <div>
        <ListGroup>
          {this.renderCartItems(this.props.cart)}
        </ListGroup>
        </div>
    )
    }
    else {
      return (
        <h1>Please log in in order to see a cart</h1>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  cart:state.cart,
  user:state.user
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getCart, addCart, deleteCart}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
