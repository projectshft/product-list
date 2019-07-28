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

  componentDidMount() {
    this.props.searchProducts({});
  }

  renderProductCards(productsArray){
    return(
      productsArray.map(product => {
        return <ProductCard product={product} key={product._id}/>;
      })
    );
  }

  render(){
    if (!this.props.products) {
      return (
        <h1>Nothing to see here yet... hold please...</h1>
      );
    } else if(this.props.products.length === 0){
      return (
        <div>
          <h4>Hey! Looks like there are no products that match your search...</h4>
          <h4>Please try again - I recommend our 'Tuna' items.</h4>
        </div>
        );
    } else 

    return (
      <div className="card-columns mb-4">
        {this.renderProductCards(this.props.products)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.products,
    // categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchProducts}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductGrid);