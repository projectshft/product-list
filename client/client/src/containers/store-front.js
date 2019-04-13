import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions/index";

// Component that sets page number to 1 and loads default list of products

class StoreFront extends Component {
  componentDidMount() {
      this.props.fetchProducts();
  }




  render() {
    return (
        <div>
            <h1>PRODUCTS</h1>
        </div>

      // render <category-filter/>
      // render <price-sort/>
      // render <pagination/>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(null, mapDispatchToProps)(StoreFront);