import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//component used to search/filter/sort our list of products
class SearchFilterSort extends Component {
    render() {
        return (
            <div>
                <div className='row'>
                    <div className='col-md-6 text-center offset-3'>
                        <h1>PRODUCTS</h1>
                    </div>
                </div>
                <div>Search bar, filter and sort options will go here</div>
            </div>
        )
    }
}

export default SearchFilterSort;