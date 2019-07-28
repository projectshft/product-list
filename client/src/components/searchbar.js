import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Searchbar extends Component {
    render() {
        return (
            <div>
                <h1 className='header'>Search:</h1> 
                <input placeholder='NOT FUNCTIONING'></input>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {products: state.products}
}

export default connect (mapStateToProps)(Searchbar);
