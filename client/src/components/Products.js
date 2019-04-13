import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';

class ProductsList extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return this.props.products.map(product => {
      return (
        <div>
          <li className="col-12 col-md-6 col-lg-3 ">
            <div className="contact-card">
              <p className="category"> Category: {product.category}</p>
              <h3 className="price">${product.price}</h3>
              <img className="img-responsive" alt="Products" src={product.image} />
              <h3 className="product">{product.name}</h3>
            </div>
          </li>
        </div> 
      )
    }); 
  }
} 

function mapStateToProps(state) {
  return { products: state.products };
}
    
function mapDispatchToProps(dispatch) {
return bindActionCreators({ fetchProducts }, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ProductsList)  