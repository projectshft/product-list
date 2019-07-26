import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchProducts } from '../actions/index';
import ProductCard from './ProductCard';

class ProductGrid extends React.Component {

  constructor(props){
    super(props);
    this.renderProductCards = this.renderProductCards.bind(this);
  }

  renderProductCards(productsArray){
    return(
      productsArray.map(product => {
        return <ProductCard product={product} />;
      })
    );
  }

  render(){
    if (!this.props.products) {
      return (
        <h1>Nothing to see here yet... hold please...</h1>
      );
    }

    return (
      <div className="card-group">
        {this.renderProductCards(this.props.products)}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchProducts}, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(ProductGrid);