import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

class Products extends Component {
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
        <div className="col-md-3">
          <div className="card">
            <h5 className="card-title">{myProducts[i].name}</h5>
            <img className="card-img-top" src="https://via.placeholder.com/250?text=Product+Image" />
            <div className="card-body">
              <p>{myProducts[i].price}</p>
              <p>{myProducts[i].category}</p>

            </div>
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
      <div className = "products-container">
        <h2>My Products</h2>
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
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Products); 