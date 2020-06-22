import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/index';
import { addSearchTerm } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { searchTerm: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.addSearchTerm(this.state.searchTerm);
    this.props.fetchProducts(this.state.searchTerm, this.props.category, this.props.sortBy);
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group navbar-form">
        <input
          placeholder="Enter a product to search for"
          className="form-control"
          value={this.props.searchTerm}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
        </span>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addSearchTerm: searchTerm => dispatch(addSearchTerm(searchTerm)),
    fetchProducts: (searchTerm, category, sortBy) => dispatch(fetchProducts(searchTerm, category, sortBy))
  }
}

function mapStateToProps(state) {
  return {
    term: state.searchTerm,
    category: state.category,
    sortBy: state.sortBy
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
