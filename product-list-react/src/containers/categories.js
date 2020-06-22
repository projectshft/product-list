import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/index';
import { addCategory } from '../actions/index';
import { addPage } from '../actions/index';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = { category: '' };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    //empty value to default to when there is no category selected
    let category = "";
    //if statement to prevent the dropdown title from being passed as a value
    if (event.target.value !== 'Categories') {
      this.setState({ category: event.target.value});
      this.props.addCategory(event.target.value);
      //setting category to this value to avoid the time it takes to get it after using setState
      category = event.target.value;
    } else {
      //if the selected value on the dropdown is "Categories" (the title), set the category as an empty string
      // category: "" will mean no category is applied to the search
      this.setState({ category: ""})
      this.props.addCategory("");
    }
    //set the current page in the store as the first page after adding a new category
    this.props.addPage(1);
    this.props.fetchProducts(this.props.searchTerm, category, this.props.sortBy);
  }

  render() {
    //returns a dropdown form with hard-coded categories to select from
    return (
      <select className="browser-default custom-select navbar-form" onChange={this.handleInputChange}>
        <option>Categories</option>
        <option value="Toys">Toys</option>
        <option value="Garden">Garden</option>
        <option value="Sports">Sports</option>
        <option value="Movies">Movies</option>
        <option value="Games">Games</option>
        <option value="Jewelery">Jewelery</option>
      </select>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addCategory: category => dispatch(addCategory(category)),
    fetchProducts: (searchTerm, category, sortBy) => dispatch(fetchProducts(searchTerm, category, sortBy)),
    addPage: (page) => dispatch(addPage(page))
  }
}

function mapStateToProps(state) {
  return {
    searchTerm: state.searchTerm,
    category: state.category,
    sortBy: state.sortBy,
    page: state.page
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);