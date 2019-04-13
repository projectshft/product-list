import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';

import { fetchFilteredProducts } from '../actions/index';

class searchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      view: false
    }
  }

  onInputChange = (e) => {
    this.setState({ term: e.target.value })
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.setState({ term: e.target.value });
  }


  render() {

    let categoryListArray;
    if (this.props.data) {
      categoryListArray = this.props.data.uniqueCategoryList.map((category) => {
        let categoryLink = <Link
          key={`category-name-${category}`}
          to={`products?category=${category}`}
          onClick={() => this.props.fetchFilteredProducts(category)}
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
                <a className="dropdown-item" href="#">High</a>
                <a className="dropdown-item" href="#">Low</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { data: state.products.data }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchFilteredProducts }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(searchBar);

