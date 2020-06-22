import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions/index';
import { addPage } from '../actions/index';

class Footer extends Component {
  constructor(props) {
    super(props);
    //set page to 1 when the footer is first loaded
    this.state = { page: 1 };
    this.props.addPage(1);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  //when a user clicks a page in the footer, get that page from the server
  handlePageClick = (event) => {
    event.preventDefault();
    this.setState({ page: event.currentTarget.value });
    this.props.addPage(event.currentTarget.value);
    this.props.fetchProducts(this.props.searchTerm, this.props.category, this.props.sortBy, event.currentTarget.value);
  }

  render() {
    //if there are no products, return an empty div
    if (!this.props.products[0]) {
      return (
        <div></div>
      )
    }
    //array to hold the buttons for each page
    let indexLinks = [];
    for (let i = 0; i < this.props.products[0].count; i++) {
      // if statement executes every 9 products (when a new page starts)
      if (i % 9 === 0) {
        //if this button is for the current selected page, highlight it
        if ((i / 9 + 1) == this.props.page) {
          indexLinks.push(
            <span key={"pageButton" + (i / 9 + 1)}> <button className="current-page-button" value={(i / 9) + 1} onClick={this.handlePageClick}><h5>{(i / 9) + 1}</h5></button> </span>
          )
        } else {
          indexLinks.push(
            <span key={"pageButton" + (i / 9 + 1)}>  <button className="page-button" value={(i / 9) + 1} onClick={this.handlePageClick}><h5>{(i / 9) + 1}</h5></button>  </span>
          )
        }
      }
    }
    return (
      <div className="footer-container">{indexLinks}</div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProducts: (searchTerm, category, sortBy, page) => dispatch(fetchProducts(searchTerm, category, sortBy, page)),
    addPage: (page) => dispatch(addPage(page))
  }
}


function mapStateToProps(state) {
  return {
    term: state.searchTerm,
    category: state.category,
    sortBy: state.sortBy,
    products: state.products,
    page: state.page
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);