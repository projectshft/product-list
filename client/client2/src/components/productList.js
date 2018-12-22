import React, { Component } from 'react'
import _ from "lodash";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { fetchProducts } from '../actions'
import Product from './singleProduct'
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import queryString from "query-string";
import { FaThumbsUp, FaQuestionCircle } from "react-icons/fa";

export class ProductList extends Component {
  componentDidMount() {
    //somehow get the products on the state
    const { fetchProducts } = this.props;
    
  }
  renderProducts = () => {
    if (!this.props.products.products) {
      return (
        <div className="jumbotron">
        <h1 className="display-4">Shop Around!</h1>
        <p className="lead">We would love to have some of your money</p>
        <hr className="my-4"/>
        <p className="lead">Everything here definitely exists and is always worth the money <FaThumbsUp/></p>
        <p>If there is anything you need, feel free to contact us and one of your representatives will be with you shortly</p>
        <button className="btn-danger btn btn-lg" onClick={() => this.getHelp()}>Get help <FaQuestionCircle/></button>
        </div>

      )
    } else if (this.props.products.products.length === 0) {
      return (
        <div className='sorry'><h1>Sorry, there were no matching results :(</h1></div> 
      )
    } 
    else {
      return this.props.products.products.map(item => {
        return <Product productItemAsProps={item} />;
      });
    }
  }
  getHelp = () => {
    alert(`You're on your own, try stack overflow. Welcome to the real world`)
  }
  renderPaginationButtons = () => {
    let currentPage = this.props.products.page_number;
    let totalPages = this.props.products.page_count;
    let buttons = []
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(<Pagination>
        <PaginationItem>
          <PaginationLink onClick={() => this.fetchPaginationResults(i)}>{i}</PaginationLink>
        </PaginationItem>
      </Pagination>)
    }

    return (
      buttons
    )
  }

  fetchPaginationResults = (destinationPage) => {
    let oldQueryObj = queryString.parse(this.props.products.url)
    let newQueryObj = {
      category: oldQueryObj['/products?category'],
      sortByPrice: oldQueryObj.price,
      page: destinationPage,
      searchTerm: oldQueryObj.search
    }
    console.log(oldQueryObj, newQueryObj)
    this.props.fetchProducts(newQueryObj)
  }


  render() {

    return <div className="container search-background">
      <div className="row">{this.renderProducts()}</div>
      <div className="row">
        <p>Current Page: {this.props.products.page_number}</p>
      </div>
      <div className="row pagination">
        {this.renderPaginationButtons()}
      </div>
    </div>

  }
}


const mapStateToProps = (state) => ({
  products: state.products
})


const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchProducts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
