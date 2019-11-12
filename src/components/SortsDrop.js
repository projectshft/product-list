import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts, setSort } from "../actions";

class SortsDrop extends Component {
  changeSort(event) {
    this.props.setSort(event.target.value);
    this.props.fetchProducts({
      query: this.props.products.query,
      category: this.props.products.category,
      sort: event.target.value,
      page: 1
    });
  }

  render() {
    return (
      <div className="inner-section">
        <select
          onChange={event => this.changeSort(event)}
          value={this.props.products.sort}
          className="search-drop"
        >
          <option value="price:low">Price: Low to High</option>
          <option value="price:high">Price: High to Low</option>
        </select>
      </div>
    );
  }
}

function mapStateToProps({ products }, ownProps) {
  return { products };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts, setSort }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortsDrop);
