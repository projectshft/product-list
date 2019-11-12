import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts, fetchCategories, setCategory } from "../actions";

class CategoriesDrop extends Component {
  componentDidMount() {
    //load the categores
    this.props.fetchCategories();
  }
  changeCategory(event) {
    this.props.setCategory(event.target.value);
    this.props.fetchProducts({
      query: this.props.products.query,
      category: event.target.value,
      sort: this.props.products.sort,
      page: 1
    });
  }

  renderCategories() {
    const elements = [];
    const { categories } = this.props;
    for (let i = 0; i < categories.length; i++) {
      elements.push(
        <option key={i + 1} value={categories[i]}>
          {categories[i]}
        </option>
      );
    }

    return elements;
  }

  render() {
    return (
      <div className="inner-section">
        <select
          onChange={event => this.changeCategory(event)}
          value={this.props.products.category}
          className="search-drop"
        >
          <option key="0" value="">
            Category...
          </option>
          {this.renderCategories()};
        </select>
      </div>
    );
  }
}

function mapStateToProps({ products, categories }, ownProps) {
  return { products, categories };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchProducts, fetchCategories, setCategory },
    dispatch
  );
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesDrop);
