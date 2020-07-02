import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';

import { fetchProductInformation } from "../actions";

class App extends Component {
  constructor() {
    super()

  }

  componentDidMount() {
    this.props.fetchProductInformation(1, '', 'highest', '');
  }

  // componentDidUpdate() {
  //   this.props.fetchProductInformation(1, '', 'highest', '');
  // }

  render() {
    //display "loading" text if props does not yet contain data
    if (!this.props.products) {
      return (
        <h1>Loading...</h1>
      )
    }

    //helper function to display each product in the router return
    const productDisplay = () => {
      return (
       //map through each product in the array returned in props
       this.props.products.map(product => {
         return (
            <div class="col-md-3 offset-md-5 m-2 bg-secondary">
              <div class="row">
                <div class="col-md-8">
                  <p>Category: {product.category}</p>
                </div>
                <div class="col-md-4">
                  <h5 class="text-right ">${(product.price)/100}</h5>
                </div>
              </div>
              <img class="mx-auto d-block w-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjlJapFK9txjcNzYxxibA5Sghs_0IkTh2_gQ&usqp=CAU"></img>
              <h4 class="text-center">{product.name}</h4>
            </div>
         )
       })
       
      )
    }

    return (

      <div>
        {/* form for searching products displayed at the top of the page */}
        <div class="row justify-content-md-center">
          <form>
            <label class="p">Search</label>
            <input type="search"></input>
            
            <label>Filter by Category</label>
            <input type="text"></input>

            <label>sort by:</label>
            <select id="cars" name="cars">
              <option value="highest">highest</option>
              <option value="lowest">lowest</option>
            </select>

          </form>
        </div>

        <div class="container-fluid">
          <div class="row justify-content-md-center">
            {productDisplay()}
          </div>
        </div>
      
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { products: state.products};
}

function mapDispatchToProp(dispatch) {
  return bindActionCreators({ fetchProductInformation }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProp)(App);