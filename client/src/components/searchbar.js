import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Searchbar extends Component {
    render() {
        return (
            <div>SearchBar</div>
        )
    }
}


function mapStateToProps(state) {
    return {products: state.products}
}

export default connect (mapStateToProps)(Searchbar);
