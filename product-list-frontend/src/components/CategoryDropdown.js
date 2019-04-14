import React, { Component } from "react";
import { connect } from 'react-redux';
import { loadProducts } from '../actions';
import { bindActionCreators } from 'redux';
import { Dropdown } from "react-bootstrap"

class CategoryDropdown extends Component {
  constructor(props) {
    super(props) 
    }
  onClickDropDownItem(e) {
    const category = e.currentTarget.textContent;
    this.props.loadProducts(category, null)
  }

  render() {
    return (
      <div>
       <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Categories
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={this.onClickDropDownItem.bind(this)}>Games</Dropdown.Item>
          <Dropdown.Item onClick={this.onClickDropDownItem.bind(this)}>Health</Dropdown.Item>
          <Dropdown.Item onClick={this.onClickDropDownItem.bind(this)}>Clothing</Dropdown.Item>
          <Dropdown.Item onClick={this.onClickDropDownItem.bind(this)}>Home</Dropdown.Item>
          <Dropdown.Item onClick={this.onClickDropDownItem.bind(this)}>Electronics</Dropdown.Item>
          <Dropdown.Item onClick={this.onClickDropDownItem.bind(this)}>Outdoors</Dropdown.Item>
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
)(CategoryDropdown);