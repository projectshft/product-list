import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { fetchProducts } from "../actions";

const SearchBox = (props) => {
  const userSearchTerms = (changeEvent) => {
    if (changeEvent.key === "Enter") {
      console.log("search term: ", changeEvent.target.value);
      props.fetchProducts(null, null, changeEvent.target.value);
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
    products: state.products,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchProducts,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
