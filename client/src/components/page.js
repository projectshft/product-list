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
        let count = this.props.products.pop()
        console.log(count)
        let pages = []
        for (let i = 1; i<=count; i+= 10) {
            pages.push(
               <button className='page' value = {Math.round(i/10-.1 +1)} onClick={this.handleClick.bind(this)}>{Math.round(i/10-.1 +1)}</button>
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
