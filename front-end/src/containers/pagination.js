import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//component for navigating through the pages of products
class Pagination extends Component {
    render (){
        return (

            // 9 products should return max per page, 91 products are in the db
            // 91/9 = 10.11 or 11 pages should be shown be default when page loads
            // page 1 is loaded on default
            // page numbers shown should decrease as the number of products decrease when searching by
            // a specific product name or sorting by category 
            <div className = 'footer'>
                <p>Page #: {this.props.page}</p>
            </div>
            
        )
    }
}

function mapStateToProps(state) {
    return {
        page: state.page
    }
}

export default connect(mapStateToProps)(Pagination);