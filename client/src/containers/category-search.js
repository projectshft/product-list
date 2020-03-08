import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchCategory, fetchProducts } from '../actions/index';


function CategorySearch(props){

    const selectedCategory = function(event) {
        console.log(event.target.value)
        props.searchCategory(`&category=${event.target.value}`)
    }    

    return (
        <div className="col-md-3">
        <form className="input-group form-control-sm" style={{margin: "10px", padding: "0px"}}>
        <select onChange={selectedCategory} className="custom-select custom-select-sm">
            <option value="null">Categories</option>
            <option value="Automotive">Automotive</option>
            <option value="Computer">Computer</option>
            <option value="Baby">Baby</option>
            <option value="Garden">Garden</option>
            <option value="Movies">Movies</option>
        </select>
        </form>
    </div>
    )

}

function mapDispatchToProps(dispatch) {
    console.log(dispatch)
  return bindActionCreators({ searchCategory, fetchProducts }, dispatch);
}

export default connect(null, mapDispatchToProps)(CategorySearch);