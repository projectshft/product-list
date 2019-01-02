import React, {Component} from 'react';
import { connect } from 'react-redux.1'
import { bindActionCreators } from 'redux';

class ProductList extends Component {
  renderProducts() {
  return this.props.products.map(product => {
    let category = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    return (
        <div className="col-md-4" key={product._id}>
          <span className="category-display">Category: {category}</span>
          <span className='price-display'>${product.price}</span>
          <img src={product.image} alt={product.name} className="thumbnail"></img>
          <p className="product-name-display">{product.name}</p>
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