import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { fetchProducts, setSearchTerm } from "../actions";

const SearchBox = (props) => {
  const userSearchTerms = (changeEvent) => {
    if (changeEvent.key === "Enter") {
      console.log("search term: ", changeEvent.target.value);
      props.fetchProducts(
        props.currentPage,
        props.category,
        changeEvent.target.value,
        props.sortOrder
      );
      props.setSearchTerm(changeEvent.target.value);
    }
  };

  return (
    <div className="text-center">
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText>Search</InputGroupText>
        </InputGroupAddon>
        <Input placeholder="Search The Catalog" onKeyDown={userSearchTerms} />
      </InputGroup>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    currentPage: state.currentPage,
    sortOrder: state.sortOrder,
    category: state.category,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchProducts,
      setSearchTerm
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
