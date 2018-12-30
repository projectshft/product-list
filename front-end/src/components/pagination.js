import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updateParams, fetchProducts } from "../actions/index";

class Pagination extends Component {
   constructor(props) {
      super(props);

      this.state = {
         pageSelected: 1
      };

      this.onClick = this.onClick.bind(this);
   }

   componentWillReceiveProps(nextProps){
      if(this.props.params !== nextProps.params){ 
           this.props.fetchProducts(nextProps.params);
      }
   }

   onClick(event, page) {
      event.preventDefault();
      this.setState({ pageSelected: page.page }, () => {
         this.props.updateParams({ page: this.state.pageSelected })
      });
   }

   renderPageNumbers() {
      let numberArray = [];
      for (let i=1; i <= this.props.products.number_pages; i++) {
         numberArray.push(i);
      }

      return numberArray.map(page => {

         if (page == this.state.pageSelected) {
            return (
               <li key={page} className="page-item"><a 
               className="page-link current-page-number" 
               tabIndex='0'
               onClick={(e) => this.onClick(e,{page})} >{page}</a></li> 
            )
         } else {
            return (
               <li key={page} className="page-item"><a 
               className="page-link" 
               tabIndex='0'
               onClick={(e) => this.onClick(e,{page})} >{page}</a></li> 
            )
         }
      })
   }

   render() {
      return (
         <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
               {this.renderPageNumbers()}
            </ul>
         </nav>
      );
   }
}

function mapStateToProps(state) {
   return state;
 }

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ updateParams, fetchProducts }, dispatch);
 }

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
