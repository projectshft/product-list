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
    
        this.onClick = this.pageNumberQuery.bind(this);
      }
    

    pageNumberQuery(event) {
 
            console.log('Page number clicked!', event.target.value)
            this.setState({ pageNumber: event.target.value})
            console.log(this.state)
            this.props.fetchProducts(event.target.value) //FIXED:First click doesn't register action
    }         
      
    // Render link/buton 1-9, with onClick to bind an action to dispatch
    // this.bind.FUNCTION captures the value of number clicked
  render() {
    return (
        <div>
            <input
                type="submit"
                value="5"
                className="btn-sm btn-primary"
                onClick={this.pageNumberQuery.bind(this)}
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


