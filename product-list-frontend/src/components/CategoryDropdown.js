import React, { Component } from "react";
import { connect } from 'react-redux';
import { updateCategory } from '../actions';
import { bindActionCreators } from 'redux';
import { Dropdown } from "react-bootstrap"

class CategoryDropdown extends Component {
  constructor(props) {
    super(props) 
    }

  onClickDropDownItem(e) {
    const clickedCategory = e.currentTarget.textContent;
    this.props.updateCategory(clickedCategory)
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
          <Dropdown.Item onClick={this.onClickDropDownItem.bind(this)}>Movies</Dropdown.Item>
          <Dropdown.Item onClick={this.onClickDropDownItem.bind(this)}>Computers</Dropdown.Item>
          <Dropdown.Item onClick={this.onClickDropDownItem.bind(this)}>Grocery</Dropdown.Item>
          <Dropdown.Item onClick={this.onClickDropDownItem.bind(this)}>Shoes</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
function mapStateToProps({ category }) {
  return { category };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { updateCategory},
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryDropdown);