import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions'


// holds the 9 or fewer current products on our main display set by
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
                <div className='product-card' key={product._id}>
                    <div className='product-image'>
                        <img src={product.image}></img>
                    </div>
                    <div className='product-info'>
                        <h5>Category: {product.category}</h5>
                        <h5>{product.name}</h5>
                        <h6>${product.price}</h6>
                    </div>             
                </div>
            )
        });
        return products;
    }
    render(){
        
        return (
        
                <div className='products'>
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