import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          {this.props.products.list.map((product) => (
            <div key={product._id} id='productItem' className='col-md-4 text-center'>
              <h5>{product.name}</h5>
              <img
                className='productImage'
                alt='Product Preview'
                src={product.image}
              />
            </div>
          ))}
        </div>
      </div>
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
