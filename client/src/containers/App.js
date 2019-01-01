import React, { Component } from 'react';
import SearchBar from './search_bar';
import ProductList from '../components/product-list'
import Pagination from '../components/pagination'
// import { Provider } from 'react-redux'
import { connect } from 'react-redux.1'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { 
      totalProducts: [],
      productsToDisplay: [],
      categories: [],
      count : 0,
      sorted: 1,
      category: 'None'
    }

    this.changePage =this.changePage.bind(this)
  }

  //generate fake data before mounting components
  componentDidMount() {
    fetch('/api/generate-fake-data')
  }

  componentWillUnmount() {
    fetch('/api/allproducts')
    .then(res =>res.json())
    .then(totalProducts => this.setState({ totalProducts }, () => console.log('All products :', totalProducts)))
  }
  //generate-fake-data and fetch the products to currently display
  // componentDidMount() {

    // .then(this.changePage(1))
    // .then(res => res.text()) 
    // .then(totalProducts => this.setState({ totalProducts }, () => console.log('All products :', totalProducts)))
  // }

  changePage = page => {
    fetch(`api/products?page=${page}`)
    .then(res => res.json())
    .then(productsToDisplay => this.setState({ productsToDisplay }, () => console.log('All products :', productsToDisplay)))
  }


  render() {
    return (
      // <Provider store={store}>
      <div className="App container container-fluid">
          <h1 id="heading">
          PRODUCTS
          </h1>
          <div className="row">
            < SearchBar />
            < ProductList products={this.state.productsToDisplay}/>
            < Pagination products={this.state.totalProducts} changePage={this.changePage()}/>
        </div>
      </div>
      // </Provider>
    );
  }
}

export default App;
