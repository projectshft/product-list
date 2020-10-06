import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions'

//component for navigating through the pages of products
class Pagination extends Component {
    render (){
        // array that will hold the correct page numbers shown on screen
        const pageNumbers = [];
        //loops through and assigns the correct amount of pages determined by parameters given
        for(let i = 1; i <= Math.ceil(this.props.products.count/9); i++) {
            pageNumbers.push(i);
            console.log(pageNumbers);
        }
        return (

            // 9 products should return max per page, 91 products are in the db
            // 91/9 = 10.11 or 11 pages should be shown be default when page loads
            // page 1 is loaded on default
            // page numbers shown should decrease as the number of products decrease when searching by
            // a specific product name or sorting by category 
            <div className = 'footer'>
                
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            {/* TODO, figure out how to pass in the number into fetchproducts and have that 
                            update to the correct page */}
                            <a onClick={() => fetchProducts(number)} href='' className='page-link'>
                                {number}
                            </a>
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