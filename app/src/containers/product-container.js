import React, { Component } from 'react';
import { connect } from 'react-redux';
import IndividualProductDiv from './individual-product'
import PaginationComponent from './pagination'


//this will be the outer container component that holds our product rows and products
//the products will be passed in as props so we can access them in this component. Each row will be passed a product as a prop and the product's id will be used a the key (react requirement)
class ProductContainer extends Component {


  renderProducts(products) {
    // products.map(products)
    console.log('products in renderProducts function:', products)

    // need to only pass the data for one product per IndividualProductDiv below, tbd..
    return (
      <div>
        <div class="row">
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
        </div>
        <div class="row">
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
        </div>
        <div class="row">
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
          <IndividualProductDiv products={products} />
        </div>
        <div>
         <PaginationComponent pageCount={products.length}/>
        </div>
      </div>
    );

  }


  render() {
    //const products = this.props.products;

    return (
      <div>
        {this.renderProducts(this.props.products)}
      </div>
    );
  }
}

function mapStateToProps({ products }) {
  console.log('Map state to props', products);
  return { products };
}

export default connect(mapStateToProps)(ProductContainer);