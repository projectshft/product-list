import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';
import { addSearchTerm } from '../actions/index';
import { addPage } from '../actions/index';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = { page: 1};
    this.props.addPage(1);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  handlePageClick = (event) => {
    event.preventDefault();
    this.setState({ page: event.currentTarget.value });
    console.log("page click event: " + event.currentTarget.value);
    this.props.addPage(event.currentTarget.value);
    this.props.fetchProducts(this.props.searchTerm, this.props.category, this.props.sortBy, event.currentTarget.value);
  }

  render() {
    console.log('starting footer render');
    console.log(this.props.products[0]);
    console.log(this.state.page);
    if(!this.props.products[0]) {
      return (
        <div></div>
      )
    }
    let indexLinks = [];
    for(let i = 0; i < this.props.products[0].count; i++) {
      if (i%9 === 0) {
        if ((i/9 + 1) == this.props.page) {
          indexLinks.push(
            <span> <button className="current-page-button" value={(i/9) + 1} onClick={this.handlePageClick}>{(i/9) + 1}</button> </span>
            )
        } else {
          indexLinks.push(
            <span> <button className="page-button" value={(i/9) + 1} onClick={this.handlePageClick}>{(i/9) + 1}</button> </span>
            )
        }
        
      // } else if (i === (this.props.products[0].count - 1)) {
      //   indexLinks.push(
      //     <span> <button value={Math.ceil(i/9) + 1} onClick={this.handlePageClick}>{Math.ceil(i/9) + 1}LAST</button> </span>
      //   )
       }
    }
    return (
      <div>{indexLinks}</div>
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