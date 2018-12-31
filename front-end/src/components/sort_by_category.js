import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

class SortByCategory extends Component {


   renderCategories() {
      let sortedCategoriesArray = this.props.categories.sort().map(category => {
         return category.charAt(0).toUpperCase() + category.slice(1);
      });
      
      return sortedCategoriesArray.map(category => {
         return (
            <option value={category} key={category}>{category}</option>
         )
      })
   }

   render() {
      return (
         <Fragment>
            {this.renderCategories()}
         </Fragment>
      );
   }
}

function mapStateToProps(state) {
   return { categories: state.products.categories };
 }

export default connect(mapStateToProps, null)(SortByCategory);