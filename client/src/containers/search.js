import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';

class Search extends Component {
    constructor(props) {
      super(props);
  
      this.state = { 
        productName: '',
        productCategory: 'undefined',
        productPriceSort: ''
      };

      this.onCategoryChange = this.onCategoryChange.bind(this);
      this.onPriceSort = this.onPriceSort.bind(this);
      this.onSearchChange = this.onSearchChange.bind(this);
      this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    async onPriceSort(event) {
      await this.setState({ productPriceSort: event.target.value });

      //if no category is selected sort prices for all products
      if(this.state.productCategory === 'undefined'){
        this.props.fetchProducts(`?price=${this.state.productPriceSort}`)
      }else{
        //if a category has been selected sort currently filtered proeducts
        this.props.fetchProducts(`?category=${this.state.productCategory}&price=${this.state.productPriceSort}`)
      }
      
    }

   async onCategoryChange(event) {
      await this.setState({ productCategory: event.target.value });
      
      //if user goes clicks on all categories, fetch all products
      if(this.state.productCategory === 'undefined'){
        this.props.fetchProducts()
      }else{
        //if a category is selected fetch selected category
        this.props.fetchProducts(`?category=${this.state.productCategory}`)
      }
    }
  

    onSearchChange(event) {
      this.setState({ productName: event.target.value });
    }
  
    onSearchSubmit(event) {
      event.preventDefault();
      this.props.fetchProducts(`?name=${this.state.productName}`);
      this.setState({ productName: '' });
    }
  
    render() {
      return (
        <nav className="navbar navbar-expand-sm t" style={{backgroundColor: "white"}}>
          <form onSubmit={this.onSearchSubmit} className="form-inline">
            <label className="form-label">Search</label>
            <input onChange={this.onSearchChange} value={this.state.productName} className="form-control" style={{marginLeft: "10px"}} type="search" placeholder="Search" aria-label="Search"/>
          </form>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown" style={{alignItem: "center"}}>
            <form className="input-group form-control-sm" style={{margin: "10px", padding: "0px"}}>
              <select value={this.state.productCategory} onChange={this.onCategoryChange} className="custom-select custom-select-md" style={{marginLeft: "10px"}}>
                  <option value="undefined">All Categories</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Computers">Computers</option>
                  <option value="Baby">Baby</option>
                  <option value="Books">Books</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Health">Health</option>
                  <option value="Home">Home</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Jewelery">Jewelery</option>
                  <option value="Garden">Garden</option>
                  <option value="Grocery">Grocery</option>
                  <option value="Movies">Movies</option>
                  <option value="Movies">Music</option>
                  <option value="Outdoors">Outdoors</option>
                  <option value="Movies">Shoes</option>
                  <option value="Sports">Sports</option>
                  <option value="Tools">Tools</option> 
                </select>
                </form>
            </li>
            <li className="nav-item dropdown">
              <form className="input-group form-control-sm" style={{margin: "10px", padding: "0px"}}>
              <select value={this.state.productPriceSort} onChange={this.onPriceSort} className="custom-select custom-select-md">
                  <option value="undefined">Price</option>
                  <option value="highest">Highest to Lowest</option>
                  <option value="lowest">Lowest to Highest</option>
              </select>
              </form>
            </li>
          </ul> 
        </nav>
      );
    }
  }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(Search);