import React, { Component } from 'react';
import SearchBar from '../containers/search-bar';
import ProductList from '../containers/product-list';
import CategoryDropdown from '../containers/category-dropdown';
import SortProducts from '../containers/sort-products';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { search: '', category: '', sort: '' };
    // this.setCategory = this.setCategory.bind(this); //not needed bc ES6 arrow function
  }

  setCategory = (event) => {
    //setState is async. Use second parameter function that runs after state is set
    this.setState({ category: event.target.value });
  };

  onSearchInputChange = (event) => {
    this.setState({ search: event.target.value });
  };

  onSearchFormSubmit = (event) => {
    event.preventDefault();
    console.log('submit!');
    // this.props.fetchProducts(this.state.search, '', '', '');
  }

  setSort = (event) => {
    //setState is async. Use second parameter function that runs after state is set
    this.setState({ sort: event.target.value });
  }

  // function () {
  //   this.props.fetchProducts('', '', this.state.sort, '');
  // }

  onRefreshBtnClick = () => {
    this.props.fetchProducts('', '', '', '');
    //HOW TO return dropdowns to their default values?
  }

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
            />{' '}
            {/*passes props down*/}
          </div>
          <div className='col-sm-3'>
            <SortProducts
              sort={this.state.sort}
              setSort={this.setSort}
              onRefreshBtnClick={this.onRefreshBtnClick}/>
          </div>
        </div>
        <ProductList />
      </div>
    );
  }
}

export default App;
