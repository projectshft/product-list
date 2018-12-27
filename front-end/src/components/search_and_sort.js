import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateSearchAndSortParams } from "../actions/index";
import SortByCategory from './sort_by_category';

class SearchAndSortBar extends Component {
   constructor(props) {
      super(props);

      this.state = {
         categoryFilter: "",
         priceFilter: "",
         searchTerms: ""
      };

      this.onInputChange = this.onInputChange.bind(this);
      this.onFormSubmit = this.onFormSubmit.bind(this);
      this.onPriceSortChange = this.onPriceSortChange.bind(this);
      this.onCategorySortChange = this.onCategorySortChange.bind(this);
   }

   onInputChange(event) {
      this.setState({ searchTerms: event.target.value });
   }

   onFormSubmit(event) {
      event.preventDefault();
      this.props.updateSearchAndSortParams(this.state);
   }

   onPriceSortChange(event){
      this.setState({ priceFilter: event.target.value });
      this.props.updateSearchAndSortParams(this.state);
   }

   onCategorySortChange(event){
      this.setState({ categoryFilter: event.target.value });
      this.props.updateSearchAndSortParams(this.state);
   }

   render() {
      return (
         <nav className="navbar navbar-light bg-light">
            <form onSubmit={this.onFormSubmit} className="form-inline">
               <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search for Products"
                  aria-label="Search"
                  value={this.state.searchTerms}
                  onChange={this.onInputChange}
               />
               <button className="btn btn-outline-success" type="submit">
                  Search
               </button>
            </form>
            <div>
            <label for='category'>Filter by Category: 
               <select onChange={this.onCategorySortChange} id="category">
                  <option value="">All Products</option>
                  <SortByCategory />
               </select>
            </label>
            </div>
            <div>
               <label for='price'>Filter by Price: 
                  <select onChange={this.onPriceSortChange} id="price">
                     <option value=''>No filter</option>
                     <option value="lowest">Low to High</option>
                     <option value="highest">High to Low</option>
                  </select>
               </label>
            </div>
         </nav>
      );
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ updateSearchAndSortParams }, dispatch);
 }

export default connect(null, mapDispatchToProps)(SearchAndSortBar);