import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  renderProducts() {
    return this.props.products.list.map((product) => {
      return (
        <li className='list-group-item' key={product.name}>
          {product.name}
        </li>
      );
    });
  }

  render() {
    return (
      <table className='table'>
        <tbody>{this.renderProducts}</tbody>
      </table>
    );
  }
}

function mapStateToProps({ products }) {
  return { products };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
