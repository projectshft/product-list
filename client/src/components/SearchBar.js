import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchProducts } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  //This is making sure the searchbar renders what you type by updating the this.state.term with the value.
  onInputChange(event) {
    this.setState({ term: event.target.value });
    // console.log(this.state.term)
  }
  //preventing the field from submitting form data because line 39 says that it's a submit type. 
  onFormSubmit(event) {
    event.preventDefault();

    // We need to go and fetch waypoint data by calling the action "searchProducts"
    this.props.searchProducts({
      query: this.state.term,
      category: this.props.currentCategory
    });
    // After fetchWaypoint data is called, then set searchBar field (term obj) to blank string. 
    this.setState({ term: '' });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="input-group">
        <input
          placeholder="Search for an awesome Product!"
          className="form-control"
          value={this.state.term}
          onChange={this.onInputChange}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </span>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    pages: state.products.pages,
    currentSearch: state.products.currentSearch,
    currentCategory: state.products.currentCategory,
    currentPage: state.products.currentPage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchProducts }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);