import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions";

class HomePage extends Component {
    constructor(props) {
      super(props);
  
      this.state = { 
            search: '',
            filter: '',
            sort: '',
            products: fetchProducts()
      };  
    }
    
    render() {
        const { products } = this.state;
        console.log('from render', products)
      return (
        
        <div>
            <div className="container" id="calCont">
            Testing 
            </div>
        </div>
  
      );
    }
  }
  
  function mapStateToProps(  { products } ) {
    return  { products }  ;
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage);