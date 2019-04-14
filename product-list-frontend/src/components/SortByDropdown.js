import React, { Component } from "react";
import { connect } from 'react-redux';
import { loadProducts } from '../actions';
import { bindActionCreators } from 'redux';
import { Dropdown } from "react-bootstrap"

class SortByDropdown extends Component {
  constructor(props) {
    super(props) 
    }

  render() {
    return (
      <div>
         <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item >Price: Low to High</Dropdown.Item>
          <Dropdown.Item >Price High to Low</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
function mapStateToProps({ products }) {
  return { products };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { loadProducts},
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortByDropdown);