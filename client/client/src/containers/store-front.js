import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions/index";

// Component dispatches action to fetch all products on page load

class StoreFront extends Component {
  componentDidMount() {
      this.props.fetchProducts(1);
  }


  render() {
    return (
        <div>
            <h1>UGLY-STORE.COM</h1>
            Pick a category and save!
            <br></br>
            <hr></hr>
        </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(null, mapDispatchToProps)(StoreFront);