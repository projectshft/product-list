import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions'

//component for navigating through the pages of products
class Pagination extends Component {
    constructor() {
        super()

        this.state = {
            page: 1
        }
        this.selectPage = this.selectPage.bind(this);
    }

    getProducts() {
        this.props.fetchProducts(this.state)
    }
    selectPage (event) {
        this.setState({page: event.target.value}, () => {
            this.getProducts()
            // this.setState({page: null})
        })
        
    }
    render (){
        // array that will hold the correct page numbers shown on screen
        const pageNumbers = [];
        //loops through and assigns the correct amount of pages determined by parameters given
        for(let i = 1; i <= Math.ceil(this.props.products.count/9); i++) {
            pageNumbers.push(i);
            // console.log(pageNumbers);
        }
        return (
            <div className = 'footer offset-2'>
                
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} onClick={this.selectPage} value={number} className='page-link'>
                                {number}
                        </li>
                    ))}
                </ul>
                
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);