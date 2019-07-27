import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";
import Product from "./product";


class App extends Component {
  //   state = {
  //     data: []
  //   };

  componentDidMount() {
    this.props.fetchProducts()
  }

  renderList() {
    if (!this.props.products) {
      return <div>loading...</div>;
    }

  return this.props.products.map((product) => {
    return (
      <Product product={product} key={product._id}/>
    );
  });

  }

  render() {
    const categories = ["Computers", "Toys", "Games", "Movies", "Jewelery", "Sports", "Kids", "Industrial", "Beauty", "Music", "Clothing",  "Home", "Shoes", "Tools", "Baby", "Books",  "Garden", "Electronics", "Health", "Outdoors", "Automotive", "Grocery"]   
    return (
      <div className="App">
        <h1>Products</h1>
        <select className="form-control" id="category-selection" defaultValue="">
          <option value="">select (optional)</option>
          {categories.map((category,index) =>
            <option key={index} value={category}>{category}</option>
          )}
        </select>
        <ul className="list-group">
          {this.renderList()}
        </ul>
      </div>
    );
  }

}


// function mapStateToProps(state) {
//   return { products: state.products };
// }

function mapStateToProps(state) {
  console.log(state.data)
  return { products : state.data.products };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);