import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions/index";
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
        itemsOnPage: 3
      };  
    }
    componentDidMount() {
      this.props.fetchProducts(this.props.searchRequests)
    }

    onPageChanged = data => {
      const { products } = this.props;
      const { currentPage, totalPages, pageLimit } = data;
  
      const offset = (currentPage - 1) * pageLimit;
      const currentProducts = products.slice(offset, offset + pageLimit);
  
      this.setState({ currentPage, currentProducts, totalPages });
    };

    dataView = () => {
      const { products } = this.props
      const { currentPage, itemsOnPage } = this.state;
      const indexOfLastItem = currentPage * itemsOnPage;
      const indexOfFirstItem = indexOfLastItem - itemsOnPage;
      const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
      console.log('from render', products.length)

      const renderItems = currentItems.map(({ _id, ...otherItemProps }) => (
            <ProductItem key={_id} {...otherItemProps} />
          ))

      return renderItems;
    }

    paginationNumbers = () =>{
      const { products } = this.props;
      const { itemsOnPage } = this.state;
  
      const pagesToNumbers = [];
      for (let i = 1; i <= Math.ceil(products.length / itemsOnPage); i++) {
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

    handleClick = (e) => {
      this.setState({
          currentPage: Number(e.target.id)
        });
    }
    
    render() {
      return (
          <div className='container mb-5'>
            <div className="row">
              {  this.dataView() }
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
    return bindActionCreators({ fetchProducts }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Products);