import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';
import ReactPaginate from 'react-paginate';

// This class handles rendering the filters along with the list of products

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  // This handles when a page in the pagination section is clicked

  handlePageClick = (data) => {
    let pageSelect = { page: data.selected + 1 };
    this.props.fetchProducts(pageSelect);
  };

  /* On submit this grabs the values of the category and price filters
     and queries for new products based upon the users selections */
     
  handleFilters = (e) => {
    e.preventDefault();
    let category =
      document.querySelector('#category').value === 'category'
        ? ""
        : document.querySelector('#category').value;
    let price =
      document.querySelector('#price').value === 'price'
        ? ""
        : document.querySelector('#price').value;
    let filterQuery = { category, price };
    this.props.fetchProducts(filterQuery);
  };

  render() {
    const { products, pages } = this.props;
    return (

      // This section creates the two filter boxes and the submit button

      <div className="container">
        <h1 className="text-center" style={{marginBottom: 30}}>Project Shift Products</h1>
        <div className="row filters justify-content-center">
          <form onSubmit={this.handleFilters}>
            <select id="category" defaultValue="category" style={{marginRight: 10}}>
              <option value="category" hidden disabled>
                Category Filter
              </option>
              <option value="Automotive">Automotive</option>
              <option value="Baby">Baby</option>
              <option value="Beauty">Beauty</option>
              <option value="Books">Books</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Games">Games</option>
              <option value="Garden">Garden</option>
              <option value="Grocery">Grocery</option>
              <option value="Health">Health</option>
              <option value="Home">Home</option>
              <option value="Kids">Kids</option>
              <option value="Movies">Movies</option>
              <option value="Music">Music</option>
              <option value="Outdoors">Outdoors</option>  
              <option value="Shoes">Shoes</option>
              <option value="Sports">Sports</option>
              <option value="Tools">Tools</option>
              <option value="Toys">Toys</option>
            </select>
            <select id="price" defaultValue="price">
              <option value="price" hidden disabled>
                Sort by Price
              </option>
              <option value="lowest">Lowest to Highest</option>
              <option value="highest">Highest to Lowest</option>              
            </select>
            <button className="btn btn-primary btn-sm" type="submit" style={{marginLeft: 10}}>
              Filter
            </button>
          </form>
        </div>

        {/* This section creates all of the products listed on the page*/ }
       
        <div className="row products">
          {products &&
            products.map(product => (
              <div key={product._id} className="col-md-4">
                <div className="card my-3 shadow">
                  <img src={product.image} style={{ width: '100%', height: '60%' }} alt="product" />
                  <div className="card-body" style={{background: '#eee'}}>
                    <h4 className="card-title">{product.name}</h4>
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

        {/* This section handles the pagination of the page */}

        <div className="row pages">
          <ReactPaginate
            previousLabel={'Prev'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'page-link'}
            pageCount={pages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.productsReducer.products,
  total: state.productsReducer.total,
  limit: state.productsReducer.limit,
  page: state.productsReducer.page,
  pages: state.productsReducer.pages
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchProducts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);