import React, { Component } from "react";
import { connect } from 'react-redux';
import { loadProducts, updateSort } from '../actions';
import { bindActionCreators } from 'redux';
import { Dropdown } from "react-bootstrap"

class SortByDropdown extends Component {
  constructor(props) {
    super(props) 
    }

  onClickSort(e) {
    const clickedSort = e.currentTarget.textContent === "Price: Low to High" ? "lowest" : "highest"
    this.props.updateSort(clickedSort)
  }

  render() {
    return (
      <div>
         <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={this.onClickSort.bind(this)}>Price: Low to High</Dropdown.Item>
          <Dropdown.Item onClick={this.onClickSort.bind(this)}>Price High to Low</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
function mapStateToProps({ sort }) {
  return { sort };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { updateSort},
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortByDropdown);