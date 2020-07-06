import React, { Component } from 'react'
import Products from "../containers/products.js"
import Categories from "../containers/categories.js"
import Sort from "../containers/sort.js"
import Pages from "../containers/pages.js"
import SearchBar from '../containers/searchbar.js'


class App extends Component {
  render() {
   
    return (

      <div>
        <div>
        <h1>TEST</h1>
          <Products/>
          <Categories/>
          <SearchBar/>
          <Sort/>
          <Pages/>
        </div>
      </div>

    )
  }
};


export default App;