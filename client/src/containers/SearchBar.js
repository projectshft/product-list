import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';
import { setNewProducts, selectSort, setNumberOfPages, goToSelectedPage } from "../actions/index";
import CategoryList from './CategoryList';
import SortSelector from './SortSelector';

//contains the search bar and builds in other filters
class SearchBar extends Component {
    constructor (props) {
      super(props);
      this.state = {
        term: ''
      }
    }

    //on any entry, update the search query and then reset the page count to 1
    onInputChange = term => {
      this.setState({term})
      this.props.goToSelectedPage(1);
    }

    //conduct a product search with the appropriate query params
    productSearch = () => {
        const url = '/products'
        const params = {
            category: this.props.currentCategory,
            price: this.props.currentSort,
            page: this.props.activePage,
            search: this.state.term
        };
        axios.get(url, { params })
        .then(res => {
            //if there are products in the response, then update the products and number of pages in the store
            if (res.data.docs) {
            this.props.setNewProducts(res.data.docs);
            this.props.setNumberOfPages(res.data.pages);
            //otherwise, make them empty
            } else {
            this.props.setNewProducts([]);
            this.props.setNumberOfPages(0);
            }
        })
        .catch(error => {
        console.error(error);
        });
    }

   //every time there is an update in the search bar, fetch based on those updated params, which will re-render
   componentDidUpdate = () => {
       this.productSearch();
   }
  
    render() {
      return (
        <div className="search-bar">
            <label>Search: </label>
          <input value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} />
          <CategoryList />
          <SortSelector />
          </div>
        );
      }
  }

  function mapStateToProps(state) {
      return {
          currentSort: state.currentSort,
          currentCategory: state.currentCategory,
          activePage: state.activePage,
          products: state.products,
      }
  }

  function mapDispatchToProps(dispatch) {
      return bindActionCreators({
        setNewProducts, setNumberOfPages, goToSelectedPage
      }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
  