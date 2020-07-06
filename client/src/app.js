import React, { Component } from 'react';
import Products from './components/product-list';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Products />
      </div>
    )
  }
}

export default App