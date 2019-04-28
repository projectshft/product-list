import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sortPrice } from "../actions/index";


class PriceSort extends Component {
   

    priceClick = (event) => {
      console.log('Price Sort Selected:', event.target.value)
      this.props.sortPrice(event.target.value)
      
    }   
  
    render() {
      return (
              // Use react-bootstrap for dropdown menu (not working)
              <div className="dropdown">
                  <button onClick={this.priceClick} value="asc"> Low to High </button>
                  <button onClick={this.priceClick} value="desc"> High to Low </button>
                  <br></br>
                  <hr></hr>
              </div>    

      );
    }
  }

  //ONLY mapDispatchToProps
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ sortPrice }, dispatch);
  }
  
  export default connect(null, mapDispatchToProps)(PriceSort);