import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchProductInformation } from "../actions";

class SearchBar extends Component {
  constructor() {
    super()

  }

  componentDidMount() {
    this.props.fetchProductInformation(1, '', 'highest', '');
  }


  render() {
    return (
      <div>
        <form>
          <label>Search</label>
          <input type="search"></input>
          
          <label>Filter by Category</label>
          <input type="text"></input>

          <label>sort by:</label>
          <select id="cars" name="cars">
            <option value="highest">highest</option>
            <option value="lowest">lowest</option>
          </select>

        </form>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return { products: state.products};
}

function mapDispatchToProp(dispatch) {
  return bindActionCreators({ fetchProductInformation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProp)(SearchBar);

