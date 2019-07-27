import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addPage } from '../actions';

class Page extends Component {

    handleClick() {
        console.log('clicked')
    }

    renderPages() {
        let pages = []
        for (let i = 1; i<=11; i++) {
            pages.push(
               <button className='page' onClick={this.handleClick.bind(this)}>{i}</button>
                )
        }
        return pages;
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
