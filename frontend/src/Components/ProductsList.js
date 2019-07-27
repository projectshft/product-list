import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../Actions';

class ProductsList extends Component {
  componentDidMount() {
    this.props.fetchProducts({});
  }

  render() {
    return (
      <div className='container'>
        products list placeholder
      </div>
    )
  }
}

//MAPPING ALL STATE FOR TESTING, CHANGE
function mapStateToProps(state) {
  return {...state};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);