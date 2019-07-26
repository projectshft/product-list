import React, { Component } from 'react';
import Title from './Title';
import ProductList from './ProductList'
import { connect } from 'react-redux';

class App extends Component {
  render(){
    return(
      <div>
      <Title/>
      <ProductList/>
    </div>
    )
  }
}

function mapStateToProps(state){
  return {...state};
}

export default connect(mapStateToProps, null)(App);
