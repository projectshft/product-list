import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions/index';


function CategorySearch(props) {
    const selectedCategory = function (event) {
        console.log(event.target.value)
        props.fetchProducts(`?category=${event.target.value}`)
      } 
  
    return (
        <div className="col-md-3">
            <form className="input-group form-control-sm" style={{margin: "10px", padding: "0px"}}>
            <select onChange={selectedCategory} className="custom-select custom-select-sm">
                <option value="null">Categories</option>
                <option value="Automotive">Automotive</option>
                <option value="Clothing">Clothing</option>
                <option value="Computers">Computers</option>
                <option value="Baby">Baby</option>
                <option value="Book">Books</option>
                <option value="Electronic">Electronics</option>
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
    console.log(fetchProducts)
  return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(null, mapDispatchToProps)(CategorySearch);