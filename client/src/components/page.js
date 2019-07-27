import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPages } from '../actions';

class Page extends Component {

    handleClick(e) {
        let pageNumber = e.target.value
        let category = this.props.category
        let sort = this.props.sort
        this.props.fetchPages(pageNumber)
    }

    renderPages() {
        let pages = []
        for (let i = 1; i<=11; i++) {
            pages.push(
               <button className='page' value = {i} onClick={this.handleClick.bind(this)}>{i}</button>
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


function mapStateToProps(state) {
    return {products: state.products, category: state.category, sort: state.sort}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators ({fetchPages}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
