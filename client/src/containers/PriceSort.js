import React from 'react';
import { connect } from 'react-redux';
import { sortPriceAscending, sortPriceDescending } from '../actions/actions';

const Price = ({ dispatch }) => {
  return (
    <div className="btn-group">
      <button type="button" className="btn btn-success">
        Sort by Price
      </button>
      <button
        type="button"
        className="btn btn-success dropdown-toggle dropdown-toggle-split"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="sr-only">Toggle Dropdown</span>
      </button>
      <div className="dropdown-menu">
        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            // dispatch(setCurrentPage(1))
            dispatch(sortByPriceDecreasing());
          }}
        >
          Highest to Lowest
        </a>

        <a
          className="dropdown-item"
          href="#"
          onClick={() => {
            // dispatch(setCurrentPage(1))
            dispatch(sortByPriceIncreasing());
          }}
        >
          Lowest to Highest
        </a>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    price: state.price
  };
}

export default connect(mapStateToProps)(Price);
