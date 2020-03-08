import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { productSearch, fetchProducts } from '../actions/index';

function Search(props){
    console.log('from search props: ', props)
        //const { products } = this.props
        // const getProductsByName = () => {
        //     let searchValue = ''
        //     if(document.getElementById("search").value !== null) searchValue = document.getElementById("search").value           
        //     props.productSearch(`&name=${ searchValue }`)
        //     props.fetchProducts(props.searchCategory)
        // }
        //onClick={getProductsByName()}

        return (
            <div className='col'>
                <input id="search"></input>
                <button id="subButton" type="button" className="btn btn-light" >Search</button>
            </div>
        )
  }
  
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ productSearch, fetchProducts }, dispatch);
  }
  
  export default connect(null, mapDispatchToProps)(Search);
