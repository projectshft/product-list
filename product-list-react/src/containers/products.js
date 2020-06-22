import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProducts } from '../actions/index';

class Products extends Component {
  constructor(props) {
    super(props);
    //fetches all products when first page is loaded
    this.props.fetchProducts();
  }

  renderProducts() {
    let myProducts = [];
    if (this.props.products[0]) {
      myProducts = this.props.products[0].products;
    }
    //return an empty div if there are no products
    if (!myProducts) {
      return (
        <div></div>
      )
    }
    //array which holds all product card rows
    let productCards = [];
    //array which holds a single row of product cards (3)
    let productRow = [];
    for (let i = 0; i < myProducts.length; i++) {
      productRow.push(
        <div className="col-md-4 card-container" key={"card" + i}>
          <div className="card">
            <span className="card-category"><h6>Category: {myProducts[i].category}</h6></span>
            <span className="card-price"><h4>${myProducts[i].price}</h4></span>
            <img className="card-img" src="https://via.placeholder.com/250?text=Product+Image" />
            <h5 className="card-title">{myProducts[i].name}</h5>
          </div>
        </div>
      )
      //if statement holds true when productRow holds a full row of product cards 
      // if true, the row is pushed into productCards
      if ((i !== 0 && (i + 1) % 3 === 0) || i === myProducts.length - 1) {
        productCards.push(
          <div className="row product-row" key={"cardRow" + i}>
            {productRow}
          </div>
        );
        //empty productRow to add new products in
        productRow = [];
      }
    }
    return (
      <div>
        {productCards}
      </div>
    )
  }

  render() {
    return (
      <div className="products-container">
        {this.renderProducts()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProducts: (searchTerm, category, sortBy) => dispatch(fetchProducts(searchTerm, category, sortBy))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products); 