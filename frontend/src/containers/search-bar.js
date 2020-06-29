import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts, setSearchTerm } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(searchTerm) {
    this.props.setSearchTerm(searchTerm);
    this.props.fetchProducts(searchTerm, this.props.sort, this.props.category, this.props.page);
  }


  render() {
    return (
      
      <div className="col-sm-4">
      <input
        className="form-control"
        type="text"
        placeholder="search"
        onChange={event => this.onInputChange(event.target.value)}
      />
    
    </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    searchTerm: state.searchTerm,
    sort: state.sort,
    category: state.category,
    page: state.page
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts, setSearchTerm }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);