import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions'

// holds the 9 or fewer current products on our main display set by
// the search-filter-sort field
class ProductList extends Component {
    //pass in API call as props
    componentDidMount(){
        this.props.fetchProducts();
    }
    //
    renderProducts(){
        return (this.props.products, product => {
            return (
                <li className='list-group-item'>{product.name}</li>
            )
        })

    }
    render(){
        return (
            <div>
                <div>Product list will go here</div>
                    <ul className='list-group'>
                        {this.renderProducts()}
                    </ul>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { products: state.products }; 
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);