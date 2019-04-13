import React from 'react'
import { connect } from 'react-redux';

const Pagination = (props) => {
  let pageCount;
  let pageLink;
  let pageLinkArray = [];

  if (props.data) {
    pageCount = props.data.count / props.data.perPage;
    for (let i = 0; i < pageCount; i++) {
      pageLink = <a key={i} href={`products?page=${i + 1}`}>{i + 1}</a>
      pageLinkArray.push(pageLink)
    }
  }

  return (
    <div>
      {pageLinkArray}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { data: state.products.data }
};

export default connect(mapStateToProps)(Pagination);
