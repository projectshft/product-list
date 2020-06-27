import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);


    this.onInputChange = this.onInputChange.bind(this);
   // this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(searchTerm) {
    this.props.fetchProducts(searchTerm);
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);