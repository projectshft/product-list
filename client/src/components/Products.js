import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';

class ProductsList extends Component {
  // componentDidMount() {
  //   this.props.fetchProducts();
  // }

  render() {
    return ( 
      <div>  
        <li className="col-12 col-md-6 col-lg-3 ">
          <div className="contact-card">
              <p className="category"> Category: Games</p>
              <h3 className="price">$42</h3>
            <img className="img-responsive" alt="Products" src="https://media.giphy.com/media/5z7CDisvSbrzfhAO2O/giphy.gif" />
            <h3 className="product">Practical Concrete Bike</h3>
          </div>
        </li>
        <li className="col-12 col-md-6 col-lg-3 ">
          <div className="contact-card">
              <p className="category"> Category: Games</p>
              <h3 className="price">$42</h3>
            <img className="img-responsive" alt="Products" src="https://media.giphy.com/media/9A5dffWW9jJoOeMVLT/giphy.gif" />
            <h3 className="product">Licensed Cotton Mouse</h3>
          </div>
        </li>
    </div>
      
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     products: state.products
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchProducts }, dispatch);
// }

export default ProductsList