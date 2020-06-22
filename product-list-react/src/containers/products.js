import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';

class Products extends Component {
  constructor(props) {
    super(props);

    this.props.fetchProducts();
  }
  // renderProducts() {
  //   let myProducts = [];
  //   console.log(this.props.products);
  //   if (this.props.products[0]) {
  //     console.log('yeet');
  //     myProducts = this.props.products[0].products;
  //   }
  //   console.log(myProducts);
  //   return myProducts.map(product => {
  //     return (
  //       <li key = {product._id}>
  //         {product.name}
  //       </li>

  //     )
  //   })
  // }

  renderProducts() {
    let myProducts = [];
    if (this.props.products[0]) {
      console.log("COUNT: " + this.props.products[0].count);
      myProducts = this.props.products[0].products;
      console.log(myProducts);
    }
    if(!myProducts) {
      console.log("PRODUCTS IS EMPTY");
      return (
        <div></div>
      )
    }
    let productCards = [];
    let productRow = [];
    for (let i = 0; i < myProducts.length; i++) {
      productRow.push(
        <div className="col-md-4 card-container">
          <div className="card">
          <span className="card-category"><h6>Category: {myProducts[i].category}</h6></span>
          <span className="card-price"><h4>${myProducts[i].price}</h4></span>
            <img className="card-img" src="https://via.placeholder.com/250?text=Product+Image" />
            <h5 className="card-title">{myProducts[i].name}</h5>
          </div>
        </div>
      )
      if((i !== 0 && (i + 1) % 3 === 0) || i === myProducts.length - 1) {
        productCards.push(
          <div className="row product-row">
            {productRow}
          </div>
        );
        console.log('product row' + productRow);
        productRow = [];
      }
    }
    console.log(productCards);
    return (
      <div>
        {productCards}
      </div>
    )
  }

  // renderProducts() {
  //   let myProducts = [];
  //   if (this.props.products[0]) {
  //     myProducts = this.props.products[0].products;
  //   }

  // }


  render() {
    return (
      <div className="products-container">
        {this.renderProducts()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
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