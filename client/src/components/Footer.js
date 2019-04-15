import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentPage } from '../actions';

class Footer extends Component {
  handlePageClick = e => {
    this.props.setCurrentPage(parseInt(e.target.name));

    e.preventDefault();
  };

  renderPageNums = count => {
    const pageNums = [];
    const itemsPerPage = 9;
    const numOfPages = Math.ceil(count / itemsPerPage);

    for (let i = 1; i <= numOfPages; i++) {
      pageNums.push(
        <a
          className="mx-2 page-num"
          name={i}
          key={i}
          onClick={this.handlePageClick}
          href="/"
        >
          {i}
        </a>
      );
    }
    return pageNums;
  };

  render() {
    return (
      <footer>
        <div className="container my-4">
          <div className="text-center mb-3">
            {this.renderPageNums(this.props.count)}
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
  const { count } = state.count;
  return {
    count
  };
};

Footer.propTypes = {
  count: PropTypes.number,
  setCurrentPage: PropTypes.func
};

export default connect(
  mapStateToProps,
  { setCurrentPage }
)(Footer);
