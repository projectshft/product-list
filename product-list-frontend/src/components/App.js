import React, { Component } from "react";
import ProductView from "./ProductView";
import SortByDropdown from "./SortByDropdown";
import CategoryDropdown from "./CategoryDropdown";

class App extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
  }

  render() {
    return (
      <div className="container-fluid">
      <h1 align="center">PRODUCTS</h1>
      <div className="d-flex">
      <div className="flex-fill-search">
      <form>
      <div className="input-group">
      <button type="button" className="btn btn-primary">Search</button>
      <input type="text" className="form-control" id="searchVal"></input>
      </div>
      </form>
      </div>
      <div className="flex-fill-categories">
        <CategoryDropdown />
        </div>
        <div className="flex-fill-sortby">
        <SortByDropdown />
        </div>
        </div>
        <ProductView />
      </div>
    );
  }
}

export default App;
