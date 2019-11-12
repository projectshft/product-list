import React, { Component } from "react";
import { connect } from "react-redux";

class PagesNav extends Component {
  renderPageNums() {
    console.log(this.props);
    const { pageNum, numPages } = this.props.products;
    const elements = [];
    for (let i = 1; i <= numPages; i++) {
      elements.push(
        <a href="#" className={i == pageNum ? "active" : ""}>
          {i}
        </a>
      );
    }

    return elements;
  }

  render() {
    return (
      <div className="pages">
        <div className="pagination" style={{ display: "inline-block" }}>
          <a href="#">&laquo;</a>
          {this.renderPageNums()}
          <a href="#">&raquo;</a>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ products }, ownProps) {
  return { products };
}

export default connect(
  mapStateToProps,
  null
)(PagesNav);
