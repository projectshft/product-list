import React from 'react';
import { Component } from 'react'
import Products from "../containers/products.js"
import '../index.css'

class App extends Component{
  render() {
    return (
      <div>
        <div>
          <Products/>
        </div>
      </div>
    )
  }
}

export default App;
