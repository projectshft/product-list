import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts, setCategory } from "../actions";

class CategoriesDrop extends Component {
  change(event) {
    this.props.setCategory(event.target.value);
    this.props.fetchProducts({
      query: this.props.products.query,
      category: event.target.value,
      sort: this.props.products.sort,
      page: 1
    });
  }

  render() {
    return (
      <div className="inner-section">
        <select
          onChange={event => this.change(event)}
          value={this.props.products.category}
          className="search-drop"
        >
          <option value="">Category...</option>
          <option value="Music">Music</option>
          <option value="Books">Books</option>
          <option value="Garden">Garden</option>
        </select>
      </div>
    );
  }
}

function mapStateToProps({ products }, ownProps) {
  return { products };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts, setCategory }, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesDrop);
