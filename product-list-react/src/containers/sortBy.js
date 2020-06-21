import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';
import { Typeahead } from 'react-bootstrap-typeahead';

import {addSortBy} from '../actions/index';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = { sortBy: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    console.log(event.target.value)
    this.props.addSortBy(event.target.value);
    this.setState({ sortBy: event.target.value });
    this.props.fetchProducts(this.props.searchTerm, this.props.category, event.target.value);
  }

  

  render() {
    return (
      <select class="browser-default custom-select" onChange={this.handleInputChange}>
        <option selected>Sort By Price</option>
        <option value="highest">High to Low</option>
        <option value="lowest">Low to High</option>
      </select>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addSortBy: sortBy => dispatch(addSortBy(sortBy)),
    fetchProducts: (searchTerm, category, sortBy) => dispatch(fetchProducts(searchTerm, category, sortBy))
  }
}

function mapStateToProps(state) {
  return {
    searchTerm: state.searchTerm,
    category: state.category,
    sortBy: state.sortBy
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);