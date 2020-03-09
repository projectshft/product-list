import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';
import ReactPaginate from 'react-paginate';


class ProductList extends Component {

  componentDidMount() {
    this.props.fetchProducts();
  }

  // handleClick for pagination change
  handlePageClick = (data) => {
    console.log('clicked ', data)
    let pageSelect = { page: data.selected + 1 };
    this.props.fetchProducts(pageSelect);
  };

  // query call for price and category selected 
  // look for category and filter by it
  handleFilters = (e) => {
    e.preventDefault();
    let category =
      document.querySelector('#category').value === 'category'  ? ""  : document.querySelector('#category').value;
    let price =
      document.querySelector('#price').value === 'price'  ? "" : document.querySelector('#price').value;
    let filterQuery = { category, price };
    console.log('inside container/productList ', filterQuery)
    this.props.fetchProducts(filterQuery);
  };
  

  render() {
    const { products, pages, category } = this.props;
    
    console.log('inside container/products.js - render() ', products)
    return (

      <div className="container">
        <div className="row filters justify-content-center">
          <form onSubmit={this.handleFilters} className="">
            <input id="searchBar" className="form-control search-field shadow" type="search" name="search" placeholder="enter your search"/>
            <br></br>
            <a className="font-weight-bold">Sort by: </a><select id="category" defaultValue="category" style={{ marginRight: 10, marginLeft: 10 }}>
              <option value="category" hidden disabled>
                Category Filter
              </option>
              <option value="">All products</option>
              <option value="Automotive">Automotive</option>
              <option value="Movies">Movies</option>
              <option value="Music">Music</option>            
              <option value="Sports">Sports</option>             
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Games">Games</option>
              <option value="Health">Health</option>
              <option value="Home">Home</option>
              <option value="Kids">Kids</option>
              <option value="Tools">Tools</option>
              <option value="Beauty">Beauty</option>
              <option value="Books">Books</option>
              <option value="Toys">Toys</option>
            </select>
            <select id="price" defaultValue="price" style={{ marginRight: 10 }}>
              <option value="price" hidden disabled>
                Sort by Price
              </option>
              <option value="lowest">Lowest to Highest</option>
              <option value="highest">Highest to Lowest</option>
            </select>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.handleFilters}>
              Filter
            </button>
          </form>
        </div>

        <div className="row products justify-content-center">
          {products &&
            products.map(product => (
              <div key={product._id} className="col-md-4 ">
                <div className="card rounded my-3 shadow mb-5 bg-white rounded justify-content-center">
                  <img src="https://images.unsplash.com/photo-1530914547840-346c183410de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" style={{ width: '100%', height: '60%' }} alt="product" />
                  <div className="card-body" style={{ background: '#eee' }}>
                    <h4 className="card-title font-italic">{product.name}</h4>
                    <p className="card-text">
                      <strong>Category: </strong>
                      {product.category}
                    </p>
                    <p className="card-text">
                      <strong>Price: </strong>${product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {<div className="row pages ">
          <ReactPaginate
            previousLabel={'Prev'}
            nextLabel={'Next'}
            breakClassName={'page-link'}
            pageCount={pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={10}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination mx-auto'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            activeClassName={'active'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
          />
        </div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productsReducer.products,
  total: state.productsReducer.total,
  limit: state.productsReducer.limit,
  category: state.productsReducer.category,
  page: state.productsReducer.page,
  pages: state.productsReducer.pages
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchProducts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);

