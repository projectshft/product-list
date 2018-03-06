import React from "react";
import SearchBar from "./search-bar";
import ProductsGrid from "./products-grid";
import Footer from "./footer";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { changeCurrentPage, getProducts } from "../actions";

import _ from "lodash";

class Page extends React.Component {

  //get product list on load
  componentWillMount(){
    this.props.getProducts({
      ...this.props.params,
      page: this.props.currentPage
    });
  }

  componentWillReceiveProps(nextProps) {
    //if user updated search params, currentPage should be reset to 1. this avoids situation where user sees empty page after narrowing search. 

    if (!_.isEqual(this.props.params, nextProps.params) && this.props.currentPage !== '1') {
      this.props.changeCurrentPage('1');
    }
  }

  componentDidUpdate(prevProps){
      this.props.getProducts({
        ...this.props.params,
        page: this.props.currentPage
      });
  }

  render() {
    return  (
      <div>
        <SearchBar />
        <Footer />
        <ProductsGrid />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    params: state.params,
    currentPage: state.currentPage
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeCurrentPage, getProducts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Page);   