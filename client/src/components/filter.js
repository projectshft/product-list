import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCategory, fetchProducts} from '../actions';


class Filter extends Component {
    
    handleClick(e) {
        e.preventDefault();
        let category = e.target.value;
        this.props.addCategory(category);
        let sort = this.props.sort;
        let page = this.props.page
        this.props.fetchProducts(1, category, sort)
    }

    render() {
        return (
            <div>
                <h1>Categories: </h1>
                <button className='btn btn-primary' value= 'Home' onClick={this.handleClick.bind(this)}>
                    Home
                </button>
                <button className='btn btn-primary' value= 'Industrial' onClick={this.handleClick.bind(this)}>
                    Industrial
                </button>            
                <button className='btn btn-primary' value= 'Games' onClick={this.handleClick.bind(this)}>
                    Games
                </button>
                <button className='btn btn-primary' value= 'Toys' onClick={this.handleClick.bind(this)}>
                    Toys
                </button>
            </div>
       
        )
    }
}


function mapStateToProps(state) {
    return {products: state.products, category: state.category, page: state.page}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators ({addCategory, fetchProducts}, dispatch)
}


export default connect (mapStateToProps, mapDispatchToProps)(Filter);