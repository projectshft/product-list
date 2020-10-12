import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';

import SearchBar from '../containers/search-bar';
import ProductList from '../containers/product-list';
import CategoryDropdown from '../containers/category-dropdown';
import SortProducts from '../containers/sort-products';

let searchWithCat;
let findCatFromSearchResults;

class App extends Component {
  constructor(props) {
    super(props);

    //this.state.list = this.props.products.list
    this.state = { list: [], search: '', category: '', sort: '' };
  }

  setCategory = (event) => {
    if (!this.state.search) {
      //setState is async. Use second parameter function that runs after state is set
      this.setState(
        { category: event.target.value },
        function () {
          this.props.fetchProducts(
            this.state.search,
            this.state.category,
            this.state.sort,
            ''
          );
        },
        function () {
          //WHY IS THIS NOT SETTING THE LOCAL LIST STATE?
          this.setState({ list: this.props.products.list });
        }
      );
    } else {
      findCatFromSearchResults = this.props.products.list.filter(function (
        element
      ) {
        //match the category names in current list of products w/ selected category
        return element.category === event.target.value;
      });
    }
    //TO WORK ON: How to rerender with this new state?
    //this.props.products.setState does not seem to work...
    //how to correctly pass list[] to product-list to rerender?
    this.setState({ list: findCatFromSearchResults }, function () {
      this.render();
    });
  };

  onSearchInputChange = (event) => {
    this.setState({ search: event.target.value });
  };

  onSearchFormSubmit = (event) => {
    event.preventDefault();
    let searchTerm = this.state.search;
    if (!this.state.category) {
      this.props.fetchProducts(
        this.state.search,
        this.state.category,
        this.state.sort,
        ''
      );
    } else {
      searchWithCat = this.props.products.list.filter(function (element) {
        let name = element.name;
        if (name.includes(searchTerm)) {
          return name;
        }
        console.log(searchWithCat);
        return searchWithCat;
      });
    }
    //TO WORK ON: How to rerender with this new state?
    //this.props.products.setState does not seem to work...
    //how to correctly pass list[] to product-list to rerender?
    this.setState({ list: searchWithCat }, function () {
      this.render();
    });
  };

  setSort = (event) => {
    //setState is async. Use second parameter function that runs after state is set
    this.setState({ sort: event.target.value }, function () {
      this.props.fetchProducts(
        this.state.search,
        this.state.category,
        this.state.sort,
        ''
      );
    });
  };

  onRefreshBtnClick = () => {
    this.props.fetchProducts('', '', '', '');
  };

  render() {
    return (
      <div>
        <div className='row nav-bar'>
          <div className='col-sm-6'>
            <SearchBar
              search={this.state.search}
              onSearchInputChange={this.onSearchInputChange}
              onSearchFormSubmit={this.onSearchFormSubmit}
            />
          </div>
          <div className='col-sm-3'>
            <CategoryDropdown
              category={this.state.category}
              setCategory={this.setCategory}
            />
          </div>
          <div className='col-sm-3'>
            <SortProducts
              sort={this.state.sort}
              setSort={this.setSort}
              onRefreshBtnClick={this.onRefreshBtnClick}
            />
          </div>
        </div>
        <ProductList list={this.state.list} />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
