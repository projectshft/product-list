import React, { Component } from "react";
import { fetchProducts } from '../actions/index'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Product from './product'
import SearchBar from "./search-bar";

class App extends Component {

  //Fetches the default GET /products on load
  componentDidMount() {
    this.props.fetchProducts();
  };

  //Should fetch the page along with the current query values and send it in a get request
  fetchPage = (e) => {
    const page = e.target.innerHTML
    this.props.fetchProducts({...this.props.values, page: page})
  }

  //Renders pagination numbers at the bottom of the page and when you click on one it should
  //query the GET /products with the page number clicked along with the current values of the query
  //at the top (price and category)
  renderPages() {
    if(this.props.products.products) {
      //Takes the total number of items and divides them by 9 (9 results per 'page') and rounds up
      //to get the correct number of pages
      const pages = (Math.ceil(this.props.products.totalItems/9));
      //Creates an array of pages with the value being 1 higher than the key of the array because pages
      //start at 1 and not 0
      const pageArray = [...Array(pages).keys()].map(x => ++x)
      return pageArray.map((pageNumber, index) => {
        return (
          <li key={index} className="page-item mx-1"><button className="page-link" onClick={this.fetchPage}>{pageNumber}</button></li>
        )
      })


    }
  }

  //Maps through the products props if they are available from the query and maps through them in order to display
  //them in card format
  renderProducts() {
    if (this.props.products.products) {
      return (
        this.props.products.products.map((product, index) => {
          return <Product product={product} key={product._id}/>
        })
 
      )
    } else {
      return (
        <div>Loading</div>
      )
    }
  }

  //The main render function for the app component.  Includes a fixed navbar for the search
  //functionality at the top along with the actual products being rendered and the pagination
  //at the bottom 
  render() {
    return (
      <div>
        <nav className="navbar fixed-top navbar-dark bg-dark justify-content-center">
        <div className="navbar-brand">Products App</div>
        <SearchBar />
        </nav>

        <div className="products">
          {this.renderProducts()}
        </div>
        <div className="pages">
          <ul className="pagination justify-content-center">
            {this.renderPages()}
          </ul>
        </div>
      </div>
  )};
}

function mapStateToProps({products}) {
  return {products}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchProducts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)