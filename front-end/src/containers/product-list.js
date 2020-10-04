import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions'
import '../CSS/product-list.css'

// holds the 9 or fewer current products on our main display set by
// the search-filter-sort field
class ProductList extends Component {
    //pass in API call as props
    componentDidMount(){
        this.props.fetchProducts();
    }
    //create a function to map the products correctly, 3 rows of 3 products each
    renderProducts(){
        //console.log(this.props.products.products)
         let products =this.props.products.products.map(product => {
            return (
                <div className= 'col-4 product' key={product._id}>
                    <div className='col-2 category'>Category: {product.category}</div>
                    <div className='col-2 price'>${product.price}</div>
                    <img className='col-2 image' src={product.image}></img>
                    <div className='col-2 name'>{product.name}</div>
                </div>
            )
        });
        return products;
    }
    render(){
        return (
        
                <div className='row-container'>
                    {this.renderProducts()}
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