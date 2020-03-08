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
        <h1>Our DB is currently down, try refreshing the page or stackoverflow</h1>
      );
    } else if(this.props.products.length === 0){
      return (
        <div>
          <h4>Sorry, I didn't find anything there...</h4>
          <h4>Perhaps, you should search for 'Cheese'?</h4>
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
    
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ searchProducts}, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductGrid);