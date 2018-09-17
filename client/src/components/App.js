import React from "react";
import { Component } from "react";

import ProductList from "../containers/product-list"
import SearchBar from "./search_bar"

//eventually put react router stuff here

//provide the skeleton structure for the app that will render on the page
//return rendered components
export default class App extends Component {
  render() {
    return (
      <div>
        <header>
        
          <h1 className="pull-left">
            APP
          </h1>
          <div className="pull-right">
            <SearchBar />
          </div>
          
        </header>

        <div className="main-content">
          <ProductList />
        </div>
      </div> 
    );
  }
}