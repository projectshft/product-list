import React, { Component } from 'react';
import { connect } from 'react-redux';
import Pages from '../containers/pages';




class Products extends Component {

  //renders each individual product
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
    if (this.props.products.length===0){
      return(
      <div className="row">
        <p>Sorry, We could not find any products that matched that search.</p>
      <Pages />
      </div>
      )
    }
    //loops through products, and sends the current count to the pages
    return (
      <div>
        <div className="row row-cols-3">
          {this.props.products.map(this.renderProduct)}
        </div>
        <div className='row justify-content-center'>
          <Pages pages={Math.ceil(this.props.count / 9)} />
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return state.ProductInfo[0];
}

export default connect(mapStateToProps)(Products);