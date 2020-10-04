import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions'
class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aTest: "just a test"
    }
  
  // console.log('props.products @ catalog =', this.props.products)
  // if (this.props.products.list.length === 0) {
  //     console.log('trying to trigger fetchProducts()')
  //     fetchProducts(null, null, null);
  //     console.log(' ->and got props.products', this.props.products)}
    }

      render() {
      console.log('catalog props.products ',this.props.products)

      return (
        <div><p>This is the catalog</p></div>
        );
};
};
function mapStateToProps(state) {
  return { products: state.products }
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts });
}
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);