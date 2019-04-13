import React, { Component } from 'react'
import Header from './components/Header'
import ProductsList from './components/ProductsList'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ProductsList />
      </div>
    )
  }
}

export default App
