import React, { Component } from 'react';
import { getProducts } from '../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Product from './product';
import Search from './search';

class App extends Component {
  // get products on load
  componentDidMount() {
    this.props.getProducts();
  }

  // get page and query 
  getPage = (e) => {
    const page = e.target.innerHTML;
    this.props.getProducts({ ...Search.WrappedComponent.values, page });
  }

  // pagination 
  renderPages() {
    if (this.props.products.products) {
      // get # of pages
      const numPages = Math.ceil(this.props.products.totalProducts / 9);
      const pages = [...Array(numPages).keys()].map(num => ++num);

      // create page link for each
      return pages.map((page, idx) => {
        return (<li key={idx} className="page-item"><button className="page-link" onClick={this.getPage}>{page}</button></li>)
      })
    }
  }

  renderProducts() {
    const products = this.props.products.products;

    if (products) return (
      products.map((product) => {
        return <Product product={product} key={product._id} />
      })
    )
    else return (<div>Loading</div>)
  }

  render() {
    if (this.props.products) {
      return (
        <div>
          <h1 id="title">PRODUCTS</h1>
          <nav className="navbar justify-content-center">
            <Search />
          </nav>
          <div className="products">
            {this.renderProducts()}
          </div>
          <div className="pages">
            <ul className="pagination justify-content-center">
              {this.renderPages()}
            </ul>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps({ products }) {
  return { products };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({ getProducts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);