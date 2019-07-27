import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProductsWithCategory, updateStoreCategory } from '../actions';


class PageOptionsHeader extends Component {

//two events to dispatch - one to make API call and one to update category property in store
  onCategoryChange = (event) => {
    this.props.fetchProductsWithCategory(event.target.value);
    this.props.updateStoreCategory(event.target.value);
  }

  render(){
    return(
    <div>
    <label>Filter by Category: </label>
    <select name='categoryFilter' onChange={this.onCategoryChange}>
      <option />
      <option value='Kids'>Kids</option>
      <option value='Electronics'>Electronics</option>
      <option value='Garden'>Garden</option>
    </select>
    </div>
    );
  }

}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchProductsWithCategory, updateStoreCategory }, dispatch);
}

export default connect(null, mapDispatchToProps)(PageOptionsHeader);

