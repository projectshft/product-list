import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategories } from '../actions';

class NavBar extends Component {

  componentDidMount() {
    this.props.getCategories();
    console.log(this.props)
  }

  handlePageClick = (data) => {

    console.log('clicked', data)
    let products = { category: data.selected };
    this.props.getCategories(products);
  };
 

  handleFilters = (e) => {
    e.preventDefault();
    let category =
      document.querySelector('#category').value === 'category'
        ? ""
        : document.querySelector('#category').value;
    let price =
      document.querySelector('#price').value === 'price'
        ? ""
        : document.querySelector('#price').value;
    let filterQuery = { category };
    console.log('inside container/navBar ', filterQuery)
    this.props.getCategories(filterQuery);
  };

  render() {
    const { products } = this.props;
    console.log('inside container/navBar.js - render() ', this.props)
    let optionTemplate = products && products.map(v => (
      <option value={v.id}>{v.category}</option>
    ));
    return (
      <div>
        <h1 className="text-danger">navigation bar</h1>
        <div className="row filters justify-content-center">
          <form onSubmit={this.handleFilters, console.log(products)}>

            <select id="category" value={this.category} onChange={this.handleChange} style={{ marginRight: 10 }}>
              {console.log('****', products)}

              {optionTemplate}


            </select>
            <select id="price" defaultValue="price">
              <option value="price" hidden disabled>
                Sort by Price
              </option>
              <option value="lowest">Lowest to Highest</option>
              <option value="highest">Highest to Lowest</option>
            </select>
            <button className="btn btn-primary btn-sm" type="submit" onClick={this.handlePageClick}>
              Filter
            </button>
          </form>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  products: state.productsReducer.products,
  page: state.productsReducer.page,

});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getCategories }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
