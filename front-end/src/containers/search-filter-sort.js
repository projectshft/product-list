import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//component used to search/filter/sort our list of products
class SearchFilterSort extends Component {
    render (){
        return (
            <div>Search bar, filter and sort options will go here</div>
        )
    }
}

export default SearchFilterSort;