import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import ProductsList from './components/Products'

class App extends Component {
  render() {
    return (
      <section className="full-page padding-lg">
        <div className="container" style={{ marginTop: '75px' }}>
          <div>
            <Header />
          </div>
          <section className="full-page padding-lg">
            <div className="container"> 
              <ul className="row">
                <ProductsList />
              </ul>
            </div>
          </section>
        </div>
      </section>
    );
  }
}

export default App;