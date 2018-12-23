import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { getCart } from '../actions/getCart'
import { addCart } from '../actions/addCart'
import { deleteCart} from '../actions/deleteCart'


export class Cart extends Component {
  componentDidMount() {
    
  }  

  render() {
    return (
      <div>
        This will eventually be the cart component
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  cart:state.cart
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getCart, addCart,deleteCart})
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
