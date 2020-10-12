import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Pagination from 'react-js-pagination';
import { fetchProducts } from '../actions';



class ProductList extends Component {
  constructor(props) {
    super(props);
  
    //this.props.products.list { list = [] } passed from app.js
    this.state = { count: 0};
  }
  componentDidMount() {
    this.props.fetchProducts('', '', '','');
  }

  handlePageChange = (pageNumber) => {
    this.setState({ page: pageNumber }, function () {
      this.props.fetchProducts('', '', '', this.props.page);
      console.log('this.state.page: ' + this.props.page);
    });
  }

  render() {
    console.log('rendering product list!');
    return (
      <div className='container'>
        <div className='row product-grid'>
          {this.props.products.list.map((product) => (
            <div key={product._id} id='productItem' className='col-md-4 '>
              <span className='category'>Category: {product.category}</span>
              <span className='price'>${product.price}</span>
              <div className='image-and-name text-center'>
                <img
                  className='productImage'
                  alt='Product Preview'
                  src={product.image}
                />
                <h6>{product.name}</h6>
              </div>
            </div>
          ))}
        </div>
        <div id='pagination'>
          <Pagination
            activePage={this.props.page}
            itemsCountPerPage={9}
            //TO UNDERSTAND: {this.props.products.list.length} shows 
            //correct # producst but does not not implement correct # pages. WHY?
            totalItemsCount={this.props.products.count}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
          <div className='product-count'>
            Total products: {this.props.products.count}
          </div>
        </div>
      </div>
    );
  }
}

//these come back as data.products
function mapStateToProps({ products }) {
  return { products };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
