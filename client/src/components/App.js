import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories } from '../actions';

import Header from './Header';
import ProductList from './ProductList';
import Footer from './Footer';

class App extends Component {
  componentDidMount = () => {
    this.props.getCategories();
  };

  render() {
    return (
      <div className="App">
        <Header />
        <ProductList />
        <Footer />
      </div>
    );
  }
}

export default connect(
  null,
  { getCategories }
)(App);
