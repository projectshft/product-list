import React, {Component} from 'react';
import {getProducts} from '../actions'
import { connect } from 'react-redux.1'
import { bindActionCreators } from 'redux';

class Pagination extends Component {
  
  handleClick = e => {
    this.props.getProducts({page: e})
  }
  render() {
  //do a for loop to avoid hardcoded data
  return (
    <div className='row' id="page-navigation">
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
  )
  }
}

function mapStateToProps(state) {
  console.log(state.products.page)
  return {page: state.products.page}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getProducts}, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(Pagination);