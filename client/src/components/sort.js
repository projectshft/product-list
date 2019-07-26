import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Sort extends Component {
    render() {
        return (
            <div>Sort</div>
        )
    }
}


function mapStateToProps(state) {
    return {products: state.products}
}

export default connect (mapStateToProps)(Sort);