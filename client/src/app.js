import React, { Component } from 'react'
import Products from './components/products'
import Pages from './components/pages'
import Navbar from './components/navbar'
// import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Products />
        <Pages />
      </div>
    )
  }
}

export default App