import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProductsWithCategory, updateStoreCategory, fetchProductsWithSort } from '../actions';


class PageOptionsHeader extends Component {

//two events to dispatch - one to make API call and one to update category property in store
  onCategoryChange = (event) => {
    this.props.fetchProductsWithCategory(event.target.value);
    this.props.updateStoreCategory(event.target.value);
  }

  onSortChange = (event) => {
    //access category from redux store
    let catQuery = this.props.category;
    this.props.fetchProductsWithSort(catQuery, event.target.value)
  }


  //search bar has no functionality right now, not doing extension 2
  render(){
    return(
    <div className='container'>
      <div className='row'>
       <div className='col-md-4'>
         <label for='search'>Search</label>
         <input name='search' type='text'/>
       </div>
       <div className='col-md-4 text-right'>
        <label>Filter by Category: </label>
        <select name='categoryFilter' onChange={this.onCategoryChange}>
         <option />
         <option value='Kids'>Kids</option>
         <option value='Electronics'>Electronics</option>
         <option value='Garden'>Garden</option>
        </select>
       </div>
       <div className='col-md-4 text-right'>
        <label>Sort By: </label>
        <select name='categoryFilter' onChange={this.onSortChange}>
         <option />
         <option value='lowest'>Price: Low to High</option>
         <option value='highest'>Price: High to Low</option>
        </select>
       </div>
      </div>
    </div>
    );
  }

}

function mapStateToProps({ products, category}){
  return { products, category };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchProductsWithCategory, updateStoreCategory, fetchProductsWithSort }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageOptionsHeader);

