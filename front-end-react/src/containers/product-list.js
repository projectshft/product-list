import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';



class ProductList extends Component {


  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    console.log('rendering product list!')
    return (
      <div className='container'>
        <div className='row product-grid'>
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

//these come back as data.products.list
function mapStateToProps({ products}) {
  return { products };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
