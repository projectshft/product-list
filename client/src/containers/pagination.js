import React, {Component} from 'react';
import {getProducts, updatePage} from '../actions'
import { connect } from 'react-redux.1'
import { bindActionCreators } from 'redux';

class Pagination extends Component {
  
  handleClick = e => {
    this.props.updatePage(e)
    this.props.getProducts(e, this.props.category, this.props.price)
  }
  render() {
  //do a for loop to avoid hardcoded data
  return (
    <div id="page-navigation">
    <p id='pagination-header'>Displaying {this.props.products.length} items of {this.props.count} available in our store</p>
    <div className='row'>
        <div className="btn btn-primary" onClick={event => this.handleClick(1)}>1</div>
        <div className="btn btn-primary" onClick={event => this.handleClick(2)}>2</div>
        <div className="btn btn-primary" onClick={event => this.handleClick(3)}>3</div>
        <div className="btn btn-primary" onClick={event => this.handleClick(4)}>4</div>
        <div className="btn btn-primary" onClick={event => this.handleClick(5)}>5</div>
        <div className="btn btn-primary" onClick={event => this.handleClick(6)}>6</div>
        <div className="btn btn-primary" onClick={event => this.handleClick(7)}>7</div>
        <div className="btn btn-primary" onClick={event => this.handleClick(8)}>8</div>
        <div className="btn btn-primary" onClick={event => this.handleClick(9)}>9</div>
        <div className="btn btn-primary" onClick={event => this.handleClick(10)}>10</div>
    </div>
  </div>
  )
  }
}

function mapStateToProps(state) {
  return {category: state.products.category, price: state.products.price, page: state.products.page, count: state.products.count, products: state.products.products}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getProducts, updatePage}, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(Pagination);