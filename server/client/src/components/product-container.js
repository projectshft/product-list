import React, { Component } from 'react';
import { connect } from 'react-redux';
import IndividualProductDiv from './individual-product'
import PaginationComponent from './pagination';
import _ from "lodash";



/* This will be the outer container component that holds our product rows and products. 
   The products will be passed in as props so we can access them in this component. Each row 
   will be passed a product as a prop and the product's id will be used a the key (react requirement)
*/
class ProductContainer extends Component {
  constructor(props) {
    super(props);

  }

  /* this function will be called from the main render() function and will map through
    all the products received, and will create an individualProductDiv component for each
  */
  renderProducts() {

    return _.map(this.props.products, product => {
      return (
        <div className="col-md-4" key={product._id}>
          <IndividualProductDiv product={product} />
        </div>
      )
    })
  }


  render() {
    return (
      <div>
        <div className="row mt-3">{this.renderProducts()}</div>
        <PaginationComponent />
      </div>
    );
  }
}

/* this component will only need to receive state from the redux store, in order to render
   the products on the page
*/
function mapStateToProps(state) {

  return {
    products: state.products,
    totalProducts: state.totalProducts,
    query: state.query
  };
}

export default connect(mapStateToProps)(ProductContainer);