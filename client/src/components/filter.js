import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Filter extends Component {
    render() {
        return (
            <div>Filter</div>
        )
    }
}


function mapStateToProps(state) {
    return {products: state.products}
}

export default connect (mapStateToProps)(Filter);