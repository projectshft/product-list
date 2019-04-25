import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { filterCategories } from "../actions/index";
// import Dropdown from 'react-bootstrap/Dropdown'

class CategoryMenu extends Component {

   

    categoryClick = (event) => {
      this.props.filterCategories(event.target.value)

    }   
  
    render() {
      return (
              // Use react-bootstrap for dropdown menu (not working)
              <div className="dropdown">
                  <button onClick={this.categoryClick} value="Jewelery"> Jewelery </button>
                  <button onClick={this.categoryClick} value="Garden"> Garden </button>
                  <button onClick={this.categoryClick} value="Toys"> Toys </button>
                  <button onClick={this.categoryClick} value="Music"> Music </button>
                  <button onClick={this.categoryClick} value="Health"> Health </button>
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
    return bindActionCreators({ filterCategories }, dispatch);
  }
  
  export default connect(null, mapDispatchToProps)(CategoryMenu);