import React, { Component } from "react";
import ProductView from "./ProductView";

class App extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        static elements
        <ProductView />
      </div>
    );
  }
}

export default App;
