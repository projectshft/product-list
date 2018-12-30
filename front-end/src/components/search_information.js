import React from "react";
import { connect } from "react-redux";

const SearchInformation = (props) => {
   
   return (
      <div className="container">
         <p>Searching for: <strong>{ props.params.search }</strong> in <strong>{ props.params.category }</strong></p>
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