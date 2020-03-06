import React, { Component } from 'react';
import { connect } from 'react-redux';


class Products extends Component {

renderProduct (productsData) {
  console.log(productsData)
}

render() {
    return (

        <div className="row d-flex ">
          {this.props.products.map(this.renderProduct)}
        </div>

    );
  }
}

function mapStateToProps({ products }) {
  console.log('products', {products})
  return { products };
}

export default connect(mapStateToProps)(Products);