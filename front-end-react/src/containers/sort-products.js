import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sortProducts } from '../actions';

class SortProducts extends Component {
  constructor(props) {
    super(props);

    this.state = { sort: '' };
    this.getSelectedValue = this.getSelectedValue.bind(this)
  }
  
  getSelectedValue() {
    let value = document.getElementById("sort");
    let result = value.options[value.selectedIndex].value;
    console.log(result);
    // document.getElementById("result").innerHTML = result;
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <select id='sort' className='custom-select-inline custom-select-sm select-sort-order'>
            <option defaultValue>Sort by</option>
            <option value='lowest'>Price: low to high</option>
            <option value='highest'>Price: high to low</option>
          </select>
          <button type="button" onclick={this.getSelectedValue}>Implement sort!</button>
        </div></div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sortProducts }, dispatch);
}

export default connect(null, mapDispatchToProps)(SortProducts);