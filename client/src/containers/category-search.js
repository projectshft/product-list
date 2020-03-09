import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProductsByCategory } from '../actions/index';


function CategorySearch(props) {
    const selectedCategory = function (event) {
        props.fetchProductsByCategory(`?category=${event.target.value}`)
    } 
  
    return (
        <div className="col-md-3">
            <form className="input-group form-control-sm" style={{margin: "10px", padding: "0px"}}>
            <select onChange={selectedCategory} className="custom-select custom-select-sm">
                <option value="undefined">Categories</option>
                <option value="Automotive">Automotive</option>
                <option value="Clothing">Clothing</option>
                <option value="Computers">Computers</option>
                <option value="Baby">Baby</option>
                <option value="Books">Books</option>
                <option value="Electronics">Electronics</option>
                <option value="Health">Health</option>
                <option value="Home">Home</option>
                <option value="Industrial">Industrial</option>
                <option value="Jewelery">Jewelery</option>
                <option value="Garden">Garden</option>
                <option value="Grocery">Grocery</option>
                <option value="Movies">Movies</option>
                <option value="Movies">Music</option>
                <option value="Outdoors">Outdoors</option>
                <option value="Movies">Shoes</option>
                <option value="Sports">Sports</option>
                <option value="Tools">Tools</option>
            </select>
            </form>
        </div>
    )
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProductsByCategory }, dispatch);
}

export default connect(null, mapDispatchToProps)(CategorySearch);