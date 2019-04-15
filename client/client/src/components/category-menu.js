import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions/index";

// import Dropdown from 'react-bootstrap/Dropdown'

class CategoryMenu extends Component {


    constructor() {
      super();
      
      this.state = { category: ''};
      
      this.onClick = this.categoryClick.bind(this);
    }
    
   

    categoryClick(event) {
 
      console.log('Category clicked!', event.target.value)
      this.setState({ category: event.target.value }, () => {
          this.props.fetchProducts(this.state.category)
          console.log('categoryQuery: ', this.state.category)
      });
    }   
  
    render() {
      return (
      
              <div className="dropdown">
                  <button onClick={this.categoryClick.bind(this)} value="Jewelery"> Jewelery </button>
                  <button onClick={this.categoryClick.bind(this)} value="Garden"> Garden </button>
                  <button onClick={this.categoryClick.bind(this)} value="Toys"> Toys </button>
                  <button onClick={this.categoryClick.bind(this)} value="Music"> Music </button>
                  <button onClick={this.categoryClick.bind(this)} value="Health"> Health </button>
                  <br></br>
                  <hr></hr>
              </div>    
        
        // Jewelery
        // Garden
        // Industrial
        // Music
        // Toys
        // Health
        // Beauty
        // Home

        // Shoes
        // Baby
        // Tools
        // Shoes
        // Automotive
        // Kids
        // Sports
        // Clothing
        // Movies
        // Computers
        // Grocery


      );
    }
  }

  //ONLY mapDispatchToProps
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
  }
  
  export default connect(null, mapDispatchToProps)(CategoryMenu);