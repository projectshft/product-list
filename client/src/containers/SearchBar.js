import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';
import { setNewProducts, selectCategory, selectSort, setNumberOfPages, goToSelectedPage } from "../actions/index";

//contains all searching components (search bar, category filter, and price sort options)
class SearchBar extends Component {
    constructor (props) {
      super(props);
      this.state = {
        term: '',
        categoryList: new Set()
      }
    }

    //on any selection, update the appropriate prop/state and then reset the page count to 1
    onInputChange = term => {
      this.setState({term})
      this.props.goToSelectedPage(1);
    }

    onCategoryChange = category => {
        this.props.selectCategory(category);
        this.props.goToSelectedPage(1);
    }

    onSortChange = sortType => {
        this.props.selectSort(sortType)
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

    //build the category list by pushing into a Set, which ensures no repeats
    setCategories = () => {
       let newCategorySet = new Set();
       axios.get('http://localhost:5000/categories').then(res => {
           res.data.forEach(category => {
            newCategorySet.add(category.category);
           })
       }).then(() => {
        this.setState({ categoryList: newCategorySet })
       })
   }

   //set the categories when it initially mounts
   componentDidMount = () => {
       this.setCategories();
   }

   //then every time there is an update in the search bar, fetch based on those updated params, which will re-render
   componentDidUpdate = () => {
       this.productSearch();
   }

   //build the category list with all values
   renderCategories = () => {
      return [...this.state.categoryList].map((category,index) => <option key={index} value = {category}>{category}</option>)
    }
  
    render() {
      return (
        <div className="search-bar">
            <label>Search: </label>
          <input value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} />
          <label>Category: </label>
          <select onChange = {event => this.onCategoryChange(event.target.value)}>
              <option value=""></option>
                {this.renderCategories()}
          </select>
          <label>Sort Option: </label>
          <select onChange = {event => this.onSortChange(event.target.value)}>
              <option value=""></option>
              <option value="highest">Price: Highest to Lowest</option>
              <option value="lowest">Price: Lowest to Highest</option>
          </select>
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
          maxPages: state.maxPages
      }
  }

  function mapDispatchToProps(dispatch) {
      return bindActionCreators({
        selectCategory, setNewProducts, setNumberOfPages, selectSort, goToSelectedPage
      }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
  