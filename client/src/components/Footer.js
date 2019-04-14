import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts, setCurrentPage } from '../actions';

class Footer extends Component {
  // componentDidUpdate = () => {
  //   const { currentCategory, currentPriceSort, currentPage } = this.props;
  //   this.props.getProducts(currentCategory, currentPriceSort, currentPage);
  // };

  handlePageClick = e => {
    this.props.setCurrentPage(parseInt(e.target.name));

    e.preventDefault();
  };

  renderPages = () => {};

  render() {
    return (
      <footer>
        <div className="container my-4">
          <div className="text-center mb-3">
            <a
              className="mx-2"
              name="1"
              onClick={this.handlePageClick}
              href="/"
            >
              1
            </a>
            <a
              className="mx-2"
              name="2"
              onClick={this.handlePageClick}
              href="/"
            >
              2
            </a>
            <a
              className="mx-2"
              name="3"
              onClick={this.handlePageClick}
              href="/"
            >
              3
            </a>
          </div>

          <p className="text-right">
            <a href="#top">Back to top</a>
          </p>
        </div>
      </footer>
    );
  }
}

const mapStateToProps = state => {
  const { count } = state.products;
  const { currentCategory } = state.currentCategory;
  const { currentPriceSort } = state.currentPriceSort;
  const { currentPage } = state.currentPage;
  return {
    count,
    currentCategory,
    currentPriceSort,
    currentPage
  };
};

Footer.propTypes = {
  count: PropTypes.number,
  currentCategory: PropTypes.string,
  currentPriceSort: PropTypes.string,
  currentPage: PropTypes.number,
  getProducts: PropTypes.func,
  setCurrentPage: PropTypes.func
};

export default connect(
  mapStateToProps,
  { getProducts, setCurrentPage }
)(Footer);
