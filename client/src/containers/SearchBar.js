import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';
import { setNewProducts, selectCategory, selectSort, setNumberOfPages } from "../actions/index";

//contains all searching components (search bar, category filter, and price sort options)
class SearchBar extends Component {
    constructor (props) {
      super(props);
      this.state = {
        term: '',
        categoryList: new Set()
      }
    }

    componentDidMount () {
        this.productSearch();
        this.setCategories();
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
    productSearch = () => {
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
       this.props.setNewProducts(res.data.docs);
       this.props.setNumberOfPages(res.data.pages);
     })
     .catch(error => {
       console.error(error);
     });
   }

    //build the category list by pushing into a Set, which ensures no repeats
   setCategories = () => {
       axios.get('http://localhost:5000/products').then(res => {
           console.log(res);
           res.data.docs.forEach(product => {
            this.state.categoryList.add(product.category);
           })
       })
   }

   //build the category list with all values
   renderCategories = () => {
       console.log([...this.state.categoryList]);
      return [...this.state.categoryList].map((category,index) => {
          console.log('mapping categories', category)
    return <option key={index} value = {category}>{category}</option>

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
          activePage: state.activePage,
          products: state.products
      }
  }

  function mapDispatchToProps(dispatch) {
      return bindActionCreators({
        selectCategory, setNewProducts, setNumberOfPages, selectSort
      }, dispatch)
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
  