import React from "react";
import { Component } from "react";

import ProductList from "../containers/product-list";
import SearchBar from "./search_bar";
import CategoryDropdown from "../containers/category-list";

//eventually put react router stuff here

//provide the skeleton structure for the app that will render on the page
//return rendered components
export default class App extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="App-header container">
            <div className="row col-12">

              <div className="col col-sm-4 col-align-center">
                <h1 className="App-title">
                  Product List
                </h1>
              </div>

              <div className="col col-sm-8">
                <div className="category-list col-md-6 col-align-center">
                  <CategoryDropdown />
                </div>

                <div className="Search col-md-6 col-align-center">
                  <SearchBar className="float-right" />
                </div>
              </div>

            </div>
          </div>
          
        </header>

        <div className="main-content">
          <ProductList />
        </div>
      </div> 
    );
  }
}