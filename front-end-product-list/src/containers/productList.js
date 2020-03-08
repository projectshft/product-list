import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchProducts} from '../actions/index';


class ProductList extends Component {
  constructor(props) {
    super(props)
  
  }

  async componentDidMount() { 
    await
    this.props.fetchProducts({})
  }

  renderProducts(productList) {
    console.log(productList)
    return (

      productList.products.map(p => (
          <div className="col-md-4">
            <div className="card-container">
              <div className="card item">
                <div className="pricebox">
                  <p className="price">${p.price}</p>
                </div>
                <div className="buybox">
                  <p className="add-to-cart"> ADD TO CART </p>
                </div>
                <div className="card-inner">
                <h4 id="product-category" className="text-right">{p.category}</h4>
                  <img src={p.image} class="proimage"></img>
                  <h4 id="product-name">{p.name}</h4>
                </div>
              </div>
            </div>
          </div>
      ))
    )
  }

  render(){
    return(
      <div id="main-view" className="container">
        <hr></hr>
         <div className="row">
        <span><h1>{this.props.products.map(this.renderProducts)}</h1></span>
        </div>
      </div>
    )
  }
}

function mapStateToProps({products}) {
  return { products }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      fetchProducts,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);