import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';
import ReactPaginate from 'react-paginate';

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  /** Function to run when page is clicked in pagination nav bar.
      Dispatches the fetchProducts action with the correct page selected by user */
  handlePageClick = (data) => {
    let selectedPage = { page: data.selected + 1 };
    this.props.fetchProducts(selectedPage);
  };

  /** Function to run when the submit filter button is clicked. Gets the values of 
      category and price filters. They can either have a value from the options drop
      down selection or they can be empty, allowing the user to decide whether to filter
      by category, price, or category and price. Dispatches the fetchQuery action with the users
      decision on those values */
  handleFilters = (e) => {
    e.preventDefault();
    let category =
      document.querySelector('#category').value === 'category' ? 
        "" : document.querySelector('#category').value;
    let price =
      document.querySelector('#price').value === 'price' ? 
        "" : document.querySelector('#price').value;
    let filterQuery = { category, price };
    this.props.fetchProducts(filterQuery);
  };

  render() {
    const { products, pages } = this.props;
    return (

      /** Create the filter and sort drop down boxes, envoke functions to get user input values
          thus dipatching fetchProducts action. Added in an All Categories option so that user 
          does not have to refresh the page to get back all products */
      <div className="container">
        <h1 className="text-center" style={{marginBottom: 45}}>Project Product List</h1>
        <div className="row filters justify-content-center">
          <form onSubmit={this.handleFilters}>
            <select id="category" defaultValue="category" style={{marginRight: 5}}>
              <option value="category" hidden disabled>
                Filter
              </option>
              <option value="">All Categories</option>
              <option value="Automotive">Automotive</option>
              <option value="Baby">Baby</option>
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
            <select id="price" defaultValue="price" style={{marginRight: 5}}>
              <option value="price" hidden disabled>Sort</option>
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option> 
            </select>
            <button className="btn btn-dark btn-sm" type="submit">
              Submit
            </button>
          </form>
        </div>

        {/** Create the product cards to render on the page. Map over the products
            array and return a card for each product containing product image, name, category, and price */}
        <div className="row products">
          {products &&
            products.map(product => (
              <div key={product._id} className="col-sm-4">
                <div className="card my-3 shadow">
                  <img src={product.image} style={{ width: '100%', height: '50%' }} alt="product" />
                  <div className="card-body" style={{background: '#e4edf9'}}>
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

        {/** Create the paginate section. onPageChange will envoke the function handlePageClick,
            allowing the fetchProducts action to dispatch with the correct page and the next 9 
            products available. */}
        <div className="row pages">
          <ReactPaginate
            pageCount={pages}
            pageRangeDisplayed={4}
            marginPagesDisplayed={1}
            previousLabel={'Prev'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'page-link'}
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