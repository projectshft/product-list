import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateParams, fetchProducts } from "../actions/index";
import SortByCategory from './sort_by_category';

class SearchAndSortBar extends Component {
   constructor(props) {
      super(props);

      //Local state to hold the search and sort selections from the UI
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

   //Make sure the params are updated correctly before fetching Products from the API
   componentWillReceiveProps(nextProps){
      if(this.props.params !== nextProps.params){ 
           this.props.fetchProducts(nextProps.params);
      }
   }

   onInputChange(event) {
      this.setState({ searchTerms: event.target.value });
   }

   onFormSubmit(event) {
      event.preventDefault();
      this.props.updateParams({ search: this.state.searchTerms, page: 1 });
   }

   onPriceSortChange(event){
      let priceValue = event.target.value;
      this.setState({ priceFilter: priceValue }, () => {
         this.props.updateParams({ price: this.state.priceFilter, page: 1 })
      });
   }

   onCategorySortChange(event){
      let categoryValue = event.target.value;
      this.setState({ categoryFilter: categoryValue }, () => {
         this.props.updateParams({ category: this.state.categoryFilter, page: 1 })
      });
     
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
               <label>Filter by Category: 
                  <select onChange={this.onCategorySortChange} id="category">
                     <option value="">All Categories</option>
                     <SortByCategory />
                  </select>
               </label>
            </div>
            <div>
               <label>Filter by Price: 
                  <select onChange={this.onPriceSortChange} id="price">
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
   return bindActionCreators({ updateParams, fetchProducts }, dispatch);
}

function mapStateToProps(state) {
   return { 
      params: state.params    
   };
 }

export default connect(mapStateToProps, mapDispatchToProps)(SearchAndSortBar);
