import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { fetchProductInformation } from "../actions";

class App extends Component {
  constructor() {
    super()

  }

  componentDidMount() {
    this.props.fetchProductInformation();
  }

  render() {
    return (
      <div>

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

export default connect(mapStateToProps, mapDispatchToProp)(App);