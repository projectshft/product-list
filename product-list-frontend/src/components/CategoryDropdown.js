import React, { Component } from "react";
import { connect } from 'react-redux';
import { updateCategory, updatePagination } from '../actions';
import { bindActionCreators } from 'redux';
import { Dropdown } from "react-bootstrap"

class CategoryDropdown extends Component {

  onClickDropDownItem(e) {
    const clickedCategory = e.currentTarget.textContent;
    this.props.updateCategory(clickedCategory)
    //Resets page to 1 on category change.
    this.props.updatePagination(1)
  }

  menuItems() {
    //Hard coded categories
    const categories = ['Games','Health','Clothing','Home','Electronics','Movies','Computers','Grocery','Shoes'];
    return categories.map(catName => {
    return (
      <Dropdown.Item key={catName} onClick={this.onClickDropDownItem.bind(this)}>{catName}</Dropdown.Item>
    )
  })
  }

  render() {
    return (
      <div>
       <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Categories
        </Dropdown.Toggle>
        <Dropdown.Menu>
        {this.menuItems()}
        </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  }
}
function mapStateToProps({ category, page }) {
  return { category, page };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { updateCategory, updatePagination},
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryDropdown);