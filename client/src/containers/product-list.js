import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {fetchProducts} from "../actions";

class ProductList extends Component {

  //when the component gets added to the dom
  //get all the products
  componentDidMount() {
    this.props.fetchProducts();
  }

  renderProductList() {
    // const name = product.map(product => product.name);
    // const category = product.map(product => product.category);
    // const price = product.map(product => product.price);
    // const image = product.map(product => product.image);

      products = this.props.products.map(product => {
        <div className="thumbnail ">
          <img src={product.image} />
          <div className="caption">
            <h3> {product.name} </h3>
            <p>{product.category}</p>
            <p> {product.price} </p> 
          </div>

        </div>
      };

      return (

        <div 
        className="col-xs-6 col-sm-4 col-lg-3"
        key={product._id}>
        {products}
        </div>

      );
  }

  render() {
    return (
      <div className="container">
        <div className="flex-row row">
          Hello
          {renderProductList()}
        </div>
      </div>
    );
  }

/*
const rootReducer = combineReducers(
  {
    products: productReducer,
    reviews: reviewReducer,
    upvotes: upvoteReducer
  }
);
*/

//map the redux state to this components props.

//taking the redux state and passing it down to this components props
function mapStateToProps({ products }) {
  console.log("product list info", products);
  return { products };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)