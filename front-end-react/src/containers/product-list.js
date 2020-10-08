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
          <form className='form-inline search'>
            <button className='btn btn-primary btn-sm' type='submit'>
              Search
            </button>
            <input className='form-control-sm' type='text' />
          </form>
          <select class='custom-select-inline custom-select-sm select-category'>
            <option selected>Select a category</option>
            <option value='1'>One</option>
            <option value='2'>Two</option>
            <option value='3'>Three</option>
          </select>
          <select class='custom-select-inline custom-select-sm select-sort-order'>
            <option selected>Sort by</option>
            <option value='lowest'>Price: low to high</option>
            <option value='highest'>Price: high to low</option>
          </select>
        </div>
        <div className='row'>
          {this.props.products.list.map((product) => (
            <div key={product._id} id='productItem' className='col-md-4 '>
              <span className='category'>Category: {product.category}</span>
              <span className='price'>${product.price}</span>
              <div className='image-and-name text-center'>
                <img
                  className='productImage'
                  alt='Product Preview'
                  src={product.image}
                />
                <h6>{product.name}</h6>
              </div>
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
