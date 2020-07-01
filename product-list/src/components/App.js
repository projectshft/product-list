import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

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
          <div>
            <p>Category: {product.category}</p>
            <p>${(product.price)/100}</p>
            <img src={product.image}></img>
            <p>{product.name}</p>
          </div>
         )
       })
       
      )
    }

    return (

      <div>
        {/* form for searching products displayed at the top of the page */}
        <div>
          <form>
            <label>Search</label>
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

        <div>
          {productDisplay()}
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