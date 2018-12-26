import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';
import ReactPaginate from 'react-paginate';

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  handlePageClick = data => {
    let pageNum = data.selected + 1;
    this.props.fetchProducts(`?page=${pageNum}`);
  };

  render() {
    const { products, pages } = this.props;

    return (
      <div className="container">
        <div className="row filters">{/* CATEGORY / PRICE SORT */}</div>
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
            containerClassName={'pagination justify-content-center'}
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
