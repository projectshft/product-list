import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Link } from 'react-router-dom';

import { fetchProductsPage } from '../actions/index';

const Pagination = (props) => {
  let pageCount;
  let pageLink;
  let pageLinkArray = [];

  if (props.data) {
    pageCount = props.data.count / props.data.perPage;
    for (let i = 0; i < pageCount; i++) {
      pageLink = <Link
        className="link-item"
        to={`/products?page=${i + 1}`}
        key={i}
        onClick={() => props.fetchProductsPage(i + 1)}>
        {i + 1}
      </Link>
      pageLinkArray.push(pageLink)
    }
  }

  return (
    <div className="text-center link-items">
      {pageLinkArray}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { data: state.products.data }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchProductsPage }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
