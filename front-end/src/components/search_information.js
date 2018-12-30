import React from "react";
import { connect } from "react-redux";

const SearchInformation = (props) => {
   const searchExist = props.params.search;
   const categorySelected = props.params.category;
   let searchingForLine;

   if (searchExist && categorySelected ) {
      searchingForLine = <p>Searching for: <strong>{ props.params.search }</strong> in <strong>{ props.params.category }</strong></p>;
   } else if ( searchExist && !categorySelected ) {
      searchingForLine = <p>Searching for: <strong>{ props.params.search }</strong> in <strong>All Categories</strong></p>;
   } else if ( !searchExist && categorySelected ) {
      searchingForLine = <p>Searching for: <strong>All Products</strong> in <strong>{ props.params.category }</strong></p>;
   } else if ( !searchExist && !categorySelected ) {
      searchingForLine = <p>Searching for: <strong>All Products</strong> in <strong>All Categories</strong></p>;
   }

      return (
         <div className="container">
            {searchingForLine}
            <p>Total number of items: <strong>{ props.products.number_items }</strong></p>
            <p>Viewing page: <strong>{ props.products.current_page }</strong> of <strong>{ props.products.number_pages }</strong></p>
         </div>
      );
}

function mapStateToProps(state) {
   return { 
            products: state.products,
            params: state.params
          };
 }

export default connect( mapStateToProps, null)(SearchInformation);