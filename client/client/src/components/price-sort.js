import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions/index";
// import Dropdown from 'react-bootstrap/Dropdown'

class PriceSort extends Component {


    constructor() {
      super();
      
      this.state = { priceSort: ''};
      
      this.onClick = this.priceClick.bind(this);
    }
    
   

    priceClick(event) {
 
      console.log('Price Sort clicked!', event.target.value)
      this.setState({ priceSort: event.target.value }, () => {
          this.props.fetchProducts(this.state.priceSort)
          console.log('Sort Price by: ', this.state.priceSort)
      });
    }   
  
    render() {
      return (
              // Use react-bootstrap for dropdown menu (not working)
              <div className="dropdown">
                  <button onClick={this.priceClick.bind(this)} value="asc"> Low to High </button>
                  <button onClick={this.priceClick.bind(this)} value="desc"> High to Low </button>
                  <br></br>
                  <hr></hr>
              </div>    

      );
    }
  }

  //ONLY mapDispatchToProps
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
  }
  
  export default connect(null, mapDispatchToProps)(PriceSort);