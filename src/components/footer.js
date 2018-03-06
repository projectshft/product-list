import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { changeCurrentPage } from "../actions";

//footer contains the current page and total number of pages. user can click on a number to change the page.

//extension: expand beyond 10 pages and add a '... more'

const Footer = (props) => {
  let pageNumbers = [];

  //calculate number of pages. There are 9 products to a page.
  let totalPages = Math.ceil(props.products.totalProducts / 9);

  for (let i = 1; i <= totalPages; i++) {

    let className = 'page-item';
    //use props.currentPage to determine which page number in the DOM is set to active.
    if (i.toString() === props.currentPage) {
      className += ' active';
    }

    pageNumbers.push(
      <li className={className} key={i}><span className="page-link"
        onClick=
        {(event) => {
          props.changeCurrentPage(event.target.innerHTML)
        }
        }>
        {i}</span></li>
    );
  }

  return (
    <nav className="d-flex justify-content-center" aria-label="Page navigation">
      <ul className="pagination">
        {pageNumbers}
      </ul>
    </nav>
  )
}


function mapStateToProps(state) {
  return {
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    products: state.products
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCurrentPage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
