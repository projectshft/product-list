import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';
import ReactPaginate from 'react-paginate';

class ProductList extends Component {
  componentDidMount() {
    // Fetch all products
    this.props.fetchProducts();
  }

  // Pagination handler
  handlePageClick = data => {
    let pageNum = data.selected + 1;
    let pageQuery = { page: pageNum };
    this.props.fetchProducts(pageQuery);
  };

  // Get category and price filters, then query products
  handleFilters = e => {
    e.preventDefault();
    let category =
      document.querySelector('#category').value === 'category'
        ? null
        : document.querySelector('#category').value;
    let price =
      document.querySelector('#price').value === 'price'
        ? null
        : document.querySelector('#price').value;
    let filterQuery = { category, price };
    this.props.fetchProducts(filterQuery);
  };

  render() {
    const { products, pages } = this.props;

    return (
      <div className="container">
        <h1 className="text-center my-3">Products</h1>
        {/* FILTERS */}
        <div className="row filters justify-content-center">
          <form onSubmit={this.handleFilters}>
            <select id="category" defaultValue="category">
              <option value="category" hidden disabled>
                Filter by Category
              </option>
              <option value="Health">Health</option>
              <option value="Grocery">Grocery</option>
              <option value="Shoes">Shoes</option>
              <option value="Toys">Toys</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Music">Music</option>
              <option value="Kids">Kids</option>
              <option value="Movies">Movies</option>
              <option value="Beauty">Beauty</option>
              <option value="Home">Home</option>
              <option value="Automotive">Automotive</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Garden">Garden</option>
              <option value="Baby">Baby</option>
              <option value="Tools">Tools</option>
              <option value="Games">Games</option>
              <option value="Sports">Sports</option>
              <option value="Outdoors">Outdoors</option>
              <option value="Books">Books</option>
              <option value="Industrial">Industrial</option>
            </select>
            <select id="price" defaultValue="price">
              <option value="price" hidden disabled>
                Sort by Price
              </option>
              <option value="highest">Highest to Lowest</option>
              <option value="lowest">Lowest to Highest</option>
            </select>
            <button className="btn btn-primary btn-sm" type="submit">
              Go
            </button>
          </form>
        </div>
        {/* PRODUCTS LIST */}
        <div className="row products">
          {products &&
            products.map(p => (
              <div key={p._id} className="col-md-4">
                <div className="card my-3">
                  <img
                    src={p.image}
                    alt="Kitten"
                    style={{ width: '100%', height: '50%' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      <strong>Price: </strong>${p.price}
                    </p>
                    <p className="card-text">
                      <strong>Category: </strong>
                      {p.category}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* PAGINATION */}
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

const mapStateToProps = state => ({
  products: state.productsReducer.products,
  total: state.productsReducer.total,
  limit: state.productsReducer.limit,
  page: state.productsReducer.page,
  pages: state.productsReducer.pages
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchProducts }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList);
