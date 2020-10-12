import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";
import { fetchProducts, setCategory, getCategories } from "../actions";

const CategorySelector = (props) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const userSearchCategory = (changeEvent) => {
    console.log("Category changed to: ", changeEvent.currentTarget.textContent);
    props.fetchProducts(
      props.currentPage,
      changeEvent.currentTarget.textContent,
      props.searchTerm,
      props.sortOrder
    );
    props.setCategory(changeEvent.currentTarget.textContent);
  };



  const makeAnArray = () => {
    let categoryCount = props.categories.length;
    let returnMe = [];
    for (let p = 0; p < categoryCount; p++) {
      returnMe.push(props.categories[p]);
    }
    return returnMe;
  };
  let niceArray = makeAnArray();
  // get state of categories from action
  return (
    <div className="text-center">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>Categories</DropdownToggle>
        <DropdownMenu>
          {/* {getCategoryDropdowns()} */}
          {niceArray.map((catItem, i) => (
            <div key={i}>
              <DropdownItem >
                <div onClick={userSearchCategory}>{catItem}</div>
              </DropdownItem>
            </div>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentPage: state.currentPage,
    sortOrder: state.sortOrder,
    searchTerm: state.searchTerm,
    categories: state.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchProducts,
      setCategory,
      getCategories,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector);


