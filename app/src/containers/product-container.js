import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { fetchProducts } from '../actions/index';
import IndividualProductDiv from './individual-product'
import PaginationComponent from './pagination';
import _ from "lodash";


//this will be the outer container component that holds our product rows and products
//the products will be passed in as props so we can access them in this component. Each row will be passed a product as a prop and the product's id will be used a the key (react requirement)
class ProductContainer extends Component {
  constructor(props) {
    super(props);
    console.log('Inside ProductContainer constructor, props= ', props);
    //the props is an object that just contains the fetchProducts function

    //the state will contain our user search input, category selection and/or price sort selection
    this.state = { page: '1', search: '', category: '', price: '' };
  
  }


  renderProducts() {
    // products.map(products)
    console.log('products in renderProducts function:', this.props.products)
    return _.map(this.props.products[0], product => {
      console.log('products in renderProducts _map function: product=', product)
      return(
        <div className="col-md-4" key={product._id}>
          <IndividualProductDiv product={product} />
        </div>
      )
    })
  }


  render() {
    //const products = this.props.products;
    console.log('Inside product-container render, this.props= ', this.props)
    return (
      <div className="row">
        {this.renderProducts()}
      </div>
    );
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchProducts }, dispatch);
// }

function mapStateToProps({ products }) {
  console.log('Inside mapStateToProps of product-container, products:', products);
  return { products };
}

export default connect(mapStateToProps)(ProductContainer);