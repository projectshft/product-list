import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts, setPage } from '../actions/index';

class Pages extends Component {
  
  constructor(props) {
    super(props);

    // The pages are using local state
    this.state = {pages: 10}

    this.selectPage = this.selectPage.bind(this);
  }


  selectPage = (page, event) => {
    event.preventDefault();

    this.props.setPage(page);
    this.props.fetchProducts(this.props.searchTerm, this.props.sort, this.props.category, page)
  }



  render() {
    console.log("Pages is rendering")
    let pages = [];
    for (let i = 1; i < this.state.pages + 1; i++) {
      pages.push(<a href='#' onClick={event => this.selectPage(i, event)}>{i.toString()} </a>);
    }
    console.log(pages);

    return (
      <div>
        {pages}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {     
    searchTerm: state.searchTerm,
    sort: state.sort,
    category: state.category,
    page: state.page
  }; 
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts, setPage }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pages);