import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSorter, fetchProducts } from '../actions'
import { bindActionCreators } from 'redux';

class Sort extends Component {

    handleClick(e) {
        e.preventDefault();
        let sort = e.target.value
        this.props.addSorter(sort);
        let category = this.props.category;
        let page = this.props.page
        this.props.fetchProducts(page, category, sort)
    }

    render() {
        return (
            <div className='dropdown'>
                <h1 className='header'>Price <i className="fas fa-caret-down"></i> </h1>
                <div className = 'dropdown-content'>
                    <button className='sort-category-button btn btn-primary' value= 'low' onClick={this.handleClick.bind(this)}>
                        Low to High
                    </button>
                    <button className='sort-category-button btn btn-primary' value='high' onClick={this.handleClick.bind(this)}>
                        High to Low
                    </button>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {products: state.products, category: state.category, page: state.page}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addSorter, fetchProducts }, dispatch);
}

export default connect (mapStateToProps, mapDispatchToProps)(Sort);