import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';

//contains all searching components (search bar, category filter, and price sort options)
class SearchBar extends Component {
    constructor (props) {
      super(props);
      this.state = {
        term: '',
        categoryList: new Set()
      }
    }
    
    onInputChange = term => {
      this.setState({term})
      this.productSearch(term);
    }

    onCategoryChange = category => {
        this.props.selectCategory(category);
    }

    onSortChange = sortType => {
        this.props.selectSort(sortType);
    }

    //conduct a product search with the appropriate query params
    productSearch = term => {
     const url = '/products'
     const params = {
        category: this.props.currentCategory,
        sort: this.props.currentSort,
        page: this.props.activePage,
        search: this.state.term
      };
      axios.get(url, { params })
     .then(res => {
         console.log(res);
       this.props.setNewProducts(res.docs);
     })
     .catch(error => {
       console.error(error);
     });
   }

    //build the category list by pushing into a Set, which ensures no repeats
   setCategories = () => {
       axios.get('/products').then(res => {
           res.docs.forEach(product => {
            this.state.categoryList.add(product.category);
           })
       })
   }

   //build the category list with all values
   renderCategories = () => {
      [...this.state.categoryList].map(category => {
          <option value = {category}>{category}</option>
      })
   }
  
    render() {
      return (
        <div className="search-bar">
          <input value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} />
          <select onChange = {event => this.onCategoryChange(event.target.value)}>
              <option value=""></option>
                {this.renderCategories()}
          </select>
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
          activePage: state.activePage
      }
  }

  function mapDispatchToProps(dispatch) {
      return bindActionCreators({
        selectCategory, setNewProducts, setNumberofPages, selectSort
      }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
  