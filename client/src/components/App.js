import React, { Component } from 'react';
import Title from './Title';
import ProductList from './ProductList'
import { connect } from 'react-redux';
import PageOptionsHeader from './PageOptionsHeader';
import PaginationFooter from './PaginationFooter';

//commented out to test if App can be dumb component
// class App extends Component {
//   render(){
//     return(
//       <div>
//       <Title/>
//       <ProductList/>
//     </div>
//     )
//   }
// }

// function mapStateToProps(state){
//   return {...state};
// }

// export default connect(mapStateToProps, null)(App);

const App = () => (
  <div>
    <Title/>
    <PageOptionsHeader/>
    <ProductList/>
    <PaginationFooter/>
  </div>
)

export default App;