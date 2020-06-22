import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';

class SortDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };

    this.onClick = this.onClick.bind(this);
   // this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onClick(event) {
    this.setState({ term: event.target.value });
    this.props.fetchProducts(this.state.term);
  }


  render() {
    return (
      <div>
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button class="dropdown-item" type="button">Action</button>
            <button class="dropdown-item" type="button">Another action</button>
            <button class="dropdown-item" type="button">Something else here</button>
          </div>
        </div>
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
)(SortDropdown);