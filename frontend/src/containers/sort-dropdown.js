import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts, setSortOption } from '../actions/index';

class SortDropdown extends Component {
  constructor(props) {
    super(props);
    
  }

  onClick(event) {
  }


  render() {
    return (
      <div>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" type="button">Action</button>
            <button className="dropdown-item" type="button">Another action</button>
            <button className="dropdown-item" type="button">Something else here</button>
          </div>
        </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return { sortOption: state.sortOption }; // and state.count, and state.sort, and state.filter...
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts, setSortOption }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortDropdown);