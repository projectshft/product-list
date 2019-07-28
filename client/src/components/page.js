import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts, addPage } from '../actions';

class Page extends Component {

    handleClick(e) {
        let page = e.target.value
        this.props.addPage(page)
        let category = this.props.category
        let sort = this.props.sort
        this.props.fetchProducts(page, category, sort)
    }

    renderPages() {
        let pages = []
        for (let i = 1; i<=1; i+= 10) {
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
    return bindActionCreators ({fetchProducts, addPage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
