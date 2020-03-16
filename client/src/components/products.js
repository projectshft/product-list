import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts, setCurrentPage, searchCategory, searchPrice, productSearch } from "../actions/index";
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types'
import ProductItem from './product-item';
import '../App.css';
import './styles.scss';

class Products extends Component {
    constructor(props) {
      super(props);
 
      this.state = { 
        currentPage: 1,
        itemsOnPage: 9
      };
    }
    componentDidMount() {
      this.props.fetchProducts(this.props.searchRequests)
      console.log('props from componentDidMount: ', this.props)
    }

    componentDidUpdate(prevProps) {
      console.log('from componentDidUpdate: ', prevProps)
      if (prevProps.searchRequests !== this.props.searchRequests){
        this.props.fetchProducts(this.props.searchRequests)
        console.log('props from componentWillUpdate: ', this.props)
      }
    }

    renderProductData = () => {
      const { products } = this.props
      const { currentPage, itemsOnPage } = this.state;
      const indexOfLastItem = currentPage * itemsOnPage;
      const indexOfFirstItem = indexOfLastItem - itemsOnPage;
      const currentItems = products.products.slice(indexOfFirstItem, indexOfLastItem);
      //console.log('from dataView products', products.products)

      const renderItems = currentItems.map(({ _id, ...otherItemProps }) => (
            <ProductItem key={_id} {...otherItemProps} />
          ))

      return renderItems;
    }

    handleClick = (e) => {
      let cPage = Number(e.target.id);
      console.log('var currentPage: ', cPage)
      
      this.props.setCurrentPage(`page=${cPage}`)
      //setState is not setting state...
      this.setState({ currentPage: cPage });
      
      console.log('after setState currentPage: ', this.state.currentPage)
      //this.props.fetchProducts(this.props.searchRequests)
    }

    paginationNumbers = () =>{
      const { products } = this.props;
      const { itemsOnPage } = this.state;
      //console.log('from pagination count: ', products.count)
  
      const pagesToNumbers = [];
      for (let i = 1; i <= Math.ceil(products.count / itemsOnPage); i++) {
        pagesToNumbers.push(i);
      } 
  
      const numbers = pagesToNumbers.map(number => {
        return (
            <li className="page-link"
              key={number} 
              id={number} 
              onClick={this.handleClick}>
              {number}
              </li>
        );
      });
  
      return numbers;
    }
    
    render() {
      return (
          <div className='container mb-5'>
            <div className="row">
              {  this.renderProductData() }
            </div>                   
            <div className="container mb-5">
                <div className="row justify-content-center">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      { this.paginationNumbers() }
                    </ul>
                  </nav>
                </div>
            </div>
          </div>
      );
    }
  }
  
  function mapStateToProps(  products ) {
    return  products 
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts, setCurrentPage, searchCategory, searchPrice, productSearch }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Products);