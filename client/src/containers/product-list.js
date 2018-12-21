import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { products } = this.props;
    return (
      <ul className="list-group col-sm-4">
        {products &&
          products.map(d => (
            <li
              key={d._id}
              onClick={() => console.log('poop')}
              className="list-group-item"
            >
              {d.name}
            </li>
          ))}
      </ul>
    );
  }
}

const mapStateToProps = state => ({
  products: state.productsReducer.products,
  total: state.productsReducer.total,
  limit: state.productsReducer.limit,
  page: state.productsReducer.page,
  pages: state.productsReducer.pages
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchProducts }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
