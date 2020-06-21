import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';
import { Typeahead } from 'react-bootstrap-typeahead';

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = { sortBy: '' };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(selectedOption) {
    this.setState({ sortBy: selectedOption });
  }

  

  render() {
    return (
      <Typeahead
        id="sortByDropdown"
        labelKey={(option) => `${option.sortByOptionTitle}`}
        options={[
          { id: 1, sortByOptionTitle: 'Price: High to Low', sortByOption: 'highest'},
          { id: 2, sortByOptionTitle: 'Price: Low to High', sortByOption: 'lowest'}
        ]}
        onChange={this.handleInputChange}
        placeholder="Sort By"
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Categories);