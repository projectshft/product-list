import React, {Component} from 'react';
import { connect } from 'react-redux'

class ProductList extends Component {
  renderProducts() {
  if (this.props.products.length === 0) {
    return (
    <div className="container container-fluid">
    <h1 id="ERROR">No products exist that meet your criteria</h1>
    </div>
    )
  }
  
  return this.props.products.map(product => {
    let category = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    return (
        <div className="col-md-4 card" key={product._id}>
         <img src={product.image} alt={product.name} className="card-img-top"></img>
          <div className="card-body">
            <div className="row">
              <div className="col-6">Category: {category}</div>
              <div className='col-6 price-display'>${product.price}</div>
            </div>
            <h5 className="product-name-display">{product.name}</h5>
          </div>
        </div>
      )
  })
}
  render() {
  return (
    <div className="container container-fluid">
     <div className="row" id="list-of-matches">
        { this.renderProducts() }
      </div>
    </div>
  )
}
}


function mapStateToProps(state) {
  return {products: state.products.products, page: state.products.page}
}



export default connect(mapStateToProps)(ProductList);