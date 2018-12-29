import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from 'axios';
import { selectCategory, goToSelectedPage } from "../actions/index";

//contains all searching components (search bar, category filter, and price sort options)
class CategoryList extends Component {
    constructor (props) {
      super(props);
      this.state = {
        categoryList: new Set()
      }
    }

    //when the user selects a new category, then update the store and go to page 1
    onCategoryChange = category => {
        this.props.selectCategory(category);
        this.props.goToSelectedPage(1);
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

   //build the category list with all values
   renderCategories = () => {
      return [...this.state.categoryList].map((category,index) => <option key={index} value = {category}>{category}</option>)
    }
  
    render() {
      return (
        <Fragment>
          <label>Category: </label>
          <select onChange = {event => this.onCategoryChange(event.target.value)}>
              <option value=""></option>
                {this.renderCategories()}
          </select>
          </Fragment>
        );
      }
  }

  function mapDispatchToProps(dispatch) {
      return bindActionCreators({
        selectCategory, goToSelectedPage
      }, dispatch)
  }
  
  export default connect(null, mapDispatchToProps)(CategoryList);
  