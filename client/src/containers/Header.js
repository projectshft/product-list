import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';

import { urlQueryObject } from '../urlQueries';
import { fetchFilteredProducts, fetchByPrice, fetchByProductName } from '../actions/index';

class searchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onInputChange = (e) => {
    this.setState({ term: e.target.value })
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.setState({ term: e.target.value });
    this.props.fetchByProductName(this.state.term);
  }

  fetchProductsByPrice = (criteria) => {
    urlQueryObject.priceQuery = criteria;
    this.props.fetchByPrice(urlQueryObject)
  }

  fetchProductsByFiltering = (categoryCriteria) => {
    urlQueryObject.categoryQuery = categoryCriteria;
    this.props.fetchFilteredProducts(urlQueryObject)
  }

  render() {

    let categoryListArray;
    if (this.props.data) {
      categoryListArray = this.props.data.uniqueCategoryList.map((category) => {
        let categoryLink = <Link
          key={`category-name-${category}`}
          to={`category=${category}`}
          onClick={() => this.fetchProductsByFiltering(`category=${category}`)}
          className="dropdown-item">{category}</Link>
        return categoryLink;
      })

    }

    return (
      <div className='header'>
        <h1 className='text-center'>Products</h1>
        <div className="header-content">
          <form onSubmit={this.onFormSubmit}>
            <input
              onChange={this.onInputChange}
              value={this.state.term}
              placeholder='Search products'
              type="text" />
          </form>
          <div className="buttons">
            <div className="btn-group product-btn">
              <button onClick={() => window.location.reload()} type="button" className="btn btn-primary">
                See All Products
              </button>
              <div className="dropdown-menu">
                {categoryListArray}
              </div>
            </div>
            <div className="btn-group category-btn">
              <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Filter by category
            </button>
              <div className="dropdown-menu">
                {categoryListArray}
              </div>
            </div>
            <div className="btn-group">
              <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sort by price
            </button>
              <div className="dropdown-menu">
                <Link
                  onClick={() => this.fetchProductsByPrice('price=highest')}
                  className="dropdown-item"
                  to='price=highest'>Highest
                </Link>
                <Link
                  onClick={() => this.fetchProductsByPrice('price=lowest')}
                  className="dropdown-item"
                  to="price=lowest">Lowest
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.products.data,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchFilteredProducts, fetchByPrice, fetchByProductName }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(searchBar);

