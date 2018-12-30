import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

class SortByCategory extends Component {
   renderCategories() {
      return this.props.categories.map(category => {
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