import React from 'react';
import {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';


class SortPrice extends Component {

    constructor() {
        super();

        this.state = { currentState: ''}
       
        this.handleSortPrice = this.handleSortPrice.bind(this)
      }


    handleSortPrice(){

        this.props.fetchProducts(this.state.currentSort)
    
    }

    render () {
        return (
            <div className="input-group col-sm-4">
            <div className="input-group-prepend">
                  <label className="input-group-text" htmlFor="inputGroupSelect01">Sort by</label>
              </div>
                  <select className="custom-select" id="inputGroupSelect01" onChange={event=> this.setState({ currentSort:  'price=' + event.target.value }, () => {this.handleSortPrice()})}>
                      <option defaultValue>Choose...</option>
                      <option value="lowest">Price: Low to High</option>
                      <option value="highest">Price: High to Low</option>
                  </select>
          
                  </div>
                      
        )
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
  }
  
function mapStateToProps({products}) {
 return {products}
}

export default connect(mapStateToProps, mapDispatchToProps)(SortPrice);