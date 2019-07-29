import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import { fetchProducts, updateStoreCategory, updateSortOrder } from '../actions';


class PageOptionsHeader extends Component {

  //two events to dispatch - one to make API call and one to update category property in store
  onCategoryChange = (event) => {
    //access sort order from store
    let sort = this.props.sortOrder;
    //expect that if I change category or sort order, I'll go back to first page of new data
    let page = 1;
    this.props.fetchProducts(page, sort, event.target.value);
    this.props.updateStoreCategory(event.target.value);
  }

  onSortChange = (event) => {
    //access category from redux store
    let catQuery = this.props.category;
    //expect that if I change category or sort order, I'll go back to first page of new data
    let page = 1;
    this.props.fetchProducts(page, event.target.value, catQuery)
    this.props.updateSortOrder(event.target.value);
  }
  //hard coding category values
  renderCategories() {
    let categories = ['Sports', 'Beauty', 'Kids', 'Tools', 'Industrial', 'Grocery', 'Games', 'Health', 'Electronics', 'Movies', 'Toys', 'Books', 'Outdoors', 'Shoes', 'Baby', 'Home', 'Garden', 'Clothing']
    return _.map(categories, category => {
      return (
        <option key={category} value={category}>{category}</option>
      )
    })
  }

  //search bar has no functionality right now, not doing extension 2
  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <label for='search'>Search</label>
            <input name='search' type='text' />
          </div>
          <div className='col-md-4 text-right'>
            <label>Filter by Category: </label>
            <select name='categoryFilter' onChange={this.onCategoryChange}>
              <option />
              {this.renderCategories()}
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

//header component will need access category, sortOrder from redux store
function mapStateToProps({ category, sortOrder }) {
  return { category, sortOrder };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts, updateStoreCategory, updateSortOrder }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PageOptionsHeader);

