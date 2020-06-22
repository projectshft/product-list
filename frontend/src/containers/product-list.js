import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/index';

class ProductList extends Component {

  constructor(props) {
    super(props);

    this.state = { term: '' };


  }

  // onInputChange(event) {
  //   this.setState({ term: event.target.value });
  //   this.props.fetchProducts(this.state.term);
  // }

  renderProducts(productData) {
    

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 border">

          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="product">{console.log(this.props.fetchProducts)}</div>
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