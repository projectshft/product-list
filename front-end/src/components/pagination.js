import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { updatePageParam } from "../actions/index";

class Pagination extends Component {
   constructor(props) {
      super(props);

      this.state = {
         //need to connect to store and set pageSelected to product page value 
         pageSelected: 1
      };

      this.onClick = this.onClick.bind(this);
   }

   onClick(event, page) {
      event.preventDefault();
      this.setState({ pageSelected: page });
   }

   render() {
      return (
         <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
               <li className="page-item"><a 
                  className="page-link" 
                  tabIndex='0'
                  onClick={(e) => this.onClick(e,1)} >1</a></li>
               <li className="page-item"><a 
                  className="page-link" 
                  tabIndex='0'
                  onClick={(e) => this.onClick(e,2)} >2</a></li>
               <li className="page-item"><a 
                  className="page-link" 
                  tabIndex='0'
                  onClick={(e) => this.onClick(e,3)} >3</a></li>
            </ul>
         </nav>
      );
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ updatePageParam }, dispatch);
 }

export default connect(null, mapDispatchToProps)(Pagination);