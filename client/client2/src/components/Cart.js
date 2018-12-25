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
  componentDidMount() {
    const {getCart} = this.props
    // getCart(this.props.user.id);
  }  
  _reduceCart (cartArray) {
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
          <Link to={`products/${cartItem._id}`}>

            <h5>{cartItem.name}</h5>
            <img src={cartItem.image} height="50px" width="50px" />
            <p>X {cartItem.quantity}</p>
             </Link>
            <button onClick={()=> this.props.deleteCart(this.props.user.id, cartItem._id)} className="btn btn-danger">X</button>
          </ListGroupItem >
      )
       ;
    })
  }

  render() {
    return (
      <div>
        <button className="btn btn-default" onClick={() => this.props.getCart(this.props.user.id)}> Click to get cart</button>
        <ListGroup>
          {this.renderCartItems(this.props.cart)}

        </ListGroup>
    
      </div>
    )
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
