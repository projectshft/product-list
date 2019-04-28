// When a number between 1 -9 and is clicked
// fetchProduct action is dispatched, with ?page=#clicked
// Returns list of 9 products found on that particular page

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions/index";


class Pagination extends Component {

    constructor(props) {
        super(props);
    
        this.state = { pageNumber: '' };
    
        // this.onClick = this.pageNumberClick.bind(this); //
      }
    
    // Updates state with clicked page number
    pageNumberClick = (event) => {
 
            console.log('Page number clicked!', event.target.value)
            this.setState({ pageNumber: event.target.value }, () => {
                this.props.fetchProducts(this.state.pageNumber)
                console.log('pageQuery: ', this.state.pageNumber)
            });
    }         

      
    // Render link/buton 1-9, with onClick to bind an action to dispatch
    // IMPROVEMENT: Render a sequential button number ==> Document count returned / 9 per page 
  render() {
    return ( 

        <div>
            <hr></hr>
            <input
                type="submit"
                value="1"
                className="btn-sm btn-primary"
                onClick={this.pageNumberClick} //Function reference
            />
            <input
                type="submit"
                value="2"
                className="btn-sm btn-primary"
                onClick={this.pageNumberClick.bind(this)}
            />
            <input
                type="submit"
                value="3"
                className="btn-sm btn-primary"
                onClick={this.pageNumberClick.bind(this)}
            />
            <input
                type="submit"
                value="4"
                className="btn-sm btn-primary"
                onClick={this.pageNumberClick.bind(this)}
            />
            <input
                type="submit"
                value="5"
                className="btn-sm btn-primary"
                onClick={this.pageNumberClick.bind(this)}
            />
            <input
                type="submit"
                value="6"
                className="btn-sm btn-primary"
                onClick={this.pageNumberClick.bind(this)}
            />
            <input
                type="submit"
                value="7"
                className="btn-sm btn-primary"
                onClick={this.pageNumberClick.bind(this)}
            />
            <input
                type="submit"
                value="8"
                className="btn-sm btn-primary"
                onClick={this.pageNumberClick.bind(this)}
            />
            <input
                type="submit"
                value="9"
                className="btn-sm btn-primary"
                onClick={this.pageNumberClick.bind(this)}
            />
        </div>
        
    );
  }
}

//ONLY mapDispatchToProps
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
  }
  
  export default connect(null, mapDispatchToProps)(Pagination);


