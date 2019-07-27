import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPage } from '../actions';

class Page extends Component {

    renderPages() {
        
        for (let i = 0; i<5; i++) {
            return (i)
        }
    }

    render () {
        return (
            <div>{this.renderPages()}</div>
        )
    } 
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators ({addPage})
}

export default connect(null, mapDispatchToProps)(Page)
