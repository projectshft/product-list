import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';
import IndividualProductDiv from './individual-product'
import PaginationComponent from './pagination'


//this will be the outer container component that holds our product rows and products
//the products will be passed in as props so we can access them in this component. Each row will be passed a product as a prop and the product's id will be used a the key (react requirement)
class ProductContainer extends Component {
  constructor(props) {
    super(props);
    console.log('Inside ProductContainer constructor, props= ', props);
    //the props is an object that just contains the fetchProducts function

    //the state will contain our user search input, category selection and/or price sort selection
    this.state = { search: 'Shoes', category: 'Shoes', price: 'Highest' };
    //this.componentDidMount(this.state);

    // this.onInputChange = this.onInputChange.bind(this);
    // this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    // this.onCategorySelect = this.onCategorySelect.bind(this);
    // this.onPriceSortSelect = this.onPriceSortSelect.bind(this);
  }

  // componentDidMount(state) {
  //   console.log("Inside component did mount for product-container, this.props=", this.props)
  //   console.log("Inside component did mount for product-container, state=", state)
  //   //this.setState({ search: 'Shoes', category: 'Shoe', price: 'Highest' });
  //   //test for getting all products on page load
    
  //   this.props.fetchProducts(state);
  // }

  renderProducts(products) {
    // products.map(products)
    console.log('products in renderProducts function:', products)

    // need to only pass the data for one product per IndividualProductDiv below, tbd..
    return (
      <div>
        <div className="row">
          <IndividualProductDiv product={products[0]} />
          <IndividualProductDiv product={products[1]} />
          <IndividualProductDiv product={products[2]} />
        </div>
        <div className="row">
          <IndividualProductDiv product={products[3]} />
          <IndividualProductDiv product={products[4]} />
          <IndividualProductDiv product={products[5]} />
        </div>
        <div className="row">
          <IndividualProductDiv product={products[6]} />
          <IndividualProductDiv product={products[7]} />
          <IndividualProductDiv product={products[8]} />
        </div>
        <div>
         <PaginationComponent productCount={products.length} />
        </div>
      </div>
    );

  }


  render() {
    //const products = this.props.products;
    console.log('Inside product-container render, this.props= ', this.props)
    return (
      <div>
        {this.props.products.map(this.renderProducts)}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

function mapStateToProps({ products }) {
  console.log('Inside mapStateToProps of product-container, products:', products);
  return { products };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);