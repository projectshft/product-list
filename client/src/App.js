import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import ProductsList from './components/Products';
import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <section className="full-page padding-lg">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Header />
            </div>
          </div>
        </div>
          <div className="container"> 
            <ul className="row">
              <ProductsList />
            </ul>
          </div>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <Footer />
          </div>
        </div>
      </section>
    );
  }
}

export default App;