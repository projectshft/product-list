import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pages from '../containers/pages';
import {bindActionCreators} from 'redux';
import {fetchProducts} from '../actions/index';



class Products extends Component {

  componentDidMount() {
    this.props.fetchProducts(this.props.QueryRequests)
  }

  renderProduct(productData) {
    return (
      <div className='col product' key={productData._id}>
        <div className='row justify-content-center'>
          <h6 className='category'>Category:{productData.category}</h6>
          <h5 className='price'>${productData.price}</h5>
        </div>
        <div className='row justify-content-center'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg/240px-Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg'></img>
        </div>
        <div className='row justify-content-center'>
          <h5>{productData.name}</h5>
        </div>
      </div>
    )
  }

  render() {
    if (this.props.ProductInfo[0]) {
      return (
        <div>
          <div className="row row-cols-3">
            {this.props.ProductInfo[0].products.map(this.renderProduct)}
          </div>
          <div className='row justify-content-center'>
            <Pages pages={Math.ceil(this.props.ProductInfo[0].count / 9)} />
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="products">
          </div>
          <div className='row'>
            <Pages pages={this.props.ProductInfo[0]} />
          </div>
        </div>
      )
    }
  }
}


function mapStateToProps(state) {
  console.log('this is data from products', state)
  return state;
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchProducts
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);