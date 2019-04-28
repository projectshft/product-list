import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { getProducts, getCategories } from '../actions';

class FilterSortPaginate extends Component {
  constructor() {
    super();

    this.state = {
      defaultOption: '',
      currentPage: 1
    };

    /**********************
     * Price Sort options
     **********************/
    this.options = {
      sortByPrice: [
        { value: 'lowest', label: 'Price ascending' },
        { value: 'highest', label: 'Price descending' }
      ]
    };
  }

  /**************************************************
   * Retrieve data for filter, sort, and pagination
   **************************************************/
  getData() {
    let filterSort = {};
    if (this.state.category) filterSort.category = this.state.category.value;
    if (this.state.price) filterSort.price = this.state.price.value;
    if (this.state.currentPage) filterSort.page = this.state.currentPage;
    this.props.getProducts(filterSort);
    this.props.getCategories();
  }

  /**************************
   * Invoke data retrieval
   ***************************/
  componentDidMount() {
    this.getData();
  }

  /*********************************
   * Click handler for page numbers
   **********************************/
  pageClickHandler(pageNumber) {
    if (pageNumber !== this.state.currentPage)
      this.update('currentPage', pageNumber);
  }

  /****************************************
   *  A function to maintain state
   *****************************************/
  update(key, value) {
    let property = {};
    property[key] = value;
    // Change state
    this.setState(property, () => this.getData());
  }

  render() {
    let pages = [];
    for (let i = 1; i < this.props.pages + 1; i++) {
      pages.push(
        <span
          className={
            i === this.state.currentPage ? 'page selectedPage' : 'page'
          }
          onClick={() => this.pageClickHandler(i)}
          key={i}
        >
          {i}
        </span>
      );
    }

    return (
      <div>
        <div>
          <div className="search-filter-sort-row">
            {/* Dummy search bar with no functionality */}
            <strong>Search: </strong>
            <input className="searchbar-input-field" type="text" />
          </div>
          <div className="search-filter-sort-row">
            {/* Initialize "Filter by category" dropdown */}
            <Dropdown
              options={this.props.categories}
              onChange={event => this.update('category', event)}
              value={this.state.category}
              placeholder="Filter by category"
            />
          </div>
          <div className="search-filter-sort-row">
            {/* Initialize "Sort by price" dropdown */}
            <Dropdown
              options={this.options.sortByPrice}
              onChange={event => this.update('price', event)}
              value={this.state.price}
              placeholder="Sort by price"
            />
          </div>
        </div>
        <hr />
        {/* Populate page number links at bottom of page */}
        <div>{this.props.children}</div>
        <hr className="bottom-rule" />
        <div className="footer-margin">
          <div className="pagination-text">
            Page:
            {pages}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { categories, currentPage, productInfo } = state;
  return {
    categories,
    currentPage,
    pages: productInfo.pages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getProducts, getCategories }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterSortPaginate);
