import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from './pagination';
import PropTypes from 'prop-types'
import ProductItem from './product-item';
import '../App.css';
import './styles.scss';

class HomePage extends Component {
    constructor(props) {
      super(props);
  
      this.state = { 
        currentPage: 1,
        itemsOnPage: 2
      };  
    }

    componentDidMount() {
      this.props.fetchProducts();
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
            <li className="waves-effect"
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
          <div className='shop-page'>
            {/*products.map(({ _id, ...otherProductProps }) => (
              <ProductsPreview key={_id} {...otherProductProps} />
            ))*/}
            <div className='collection-preview'>
                <div className='preview'>
                  {/*products
                    .filter((item, idx) => idx < 4)
                    .map(({ _id, ...otherItemProps }) => (
                      <ProductItem key={_id} {...otherItemProps} />
                    ))*/}
                    {  this.dataView() }
                </div>
            </div>

            <div className="container mb-5">
            <div className="row d-flex flex-row py-5">
    
              <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                <div className="d-flex flex-row py-4 align-items-center">testing 
                  { this.paginationNumbers() }
                </div>
              </div>
            </div>
          </div>
          </div>
      );
    }
  }
  
  function mapStateToProps(  { products } ) {
    return  { products };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(HomePage);