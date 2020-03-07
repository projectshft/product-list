import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from "./pagination";
import ProductItem from './product-item';
import './styles.scss';

class HomePage extends Component {
    constructor(props) {
      super(props);
  
      this.state = { 
        currentPage: null,
        totalPages: null
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

    render() {
        const { products } = this.props
        const { currentPage, totalPages } = this.state;
        const totalProducts = products.length;
        if (totalProducts === 0) return null;
        
        console.log('from render', products)
      return (
          <div className='shop-page'>
            {/*products.map(({ _id, ...otherProductProps }) => (
              <ProductsPreview key={_id} {...otherProductProps} />
            ))*/}
            <div className='collection-preview'>
                <div className='preview'>
                  {products
                    .filter((item, idx) => idx < 4)
                    .map(({ _id, ...otherItemProps }) => (
                      <ProductItem key={_id} {...otherItemProps} />
                    ))}
                </div>
            </div>
            <div className="container mb-5">
            <div className="row d-flex flex-row py-5">
            <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
            <div className="d-flex flex-row py-4 align-items-center">
              <Pagination
                totalRecords={totalProducts}
                pageLimit={18}
                pageNeighbours={1}
                onPageChanged={this.onPageChanged}
              />
            </div>
            </div></div></div>
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