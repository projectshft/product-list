import React from "react";
import { Component } from "react";

import ProductList from "../containers/product-list"

//eventually put react router stuff here

//provide the skeleton structure for the app that will render on the page
//return rendered components
export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>
            APP
          </h1>
        </header>

        <div>
          <ProductList />
        </div>
        
      </div> 
    );
  }
}
