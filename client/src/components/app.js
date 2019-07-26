import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions'

class AppIndex extends Component {
    //once the components mounts to the DOM populate the store with data
    componentDidMount() {
        this.props.fetchProducts()
    }

    renderProducts() {
        console.log(this.props.product)
         return this.props.products.map(product => {
            return (
                //make 3 rows of 3 for the products return from the url
                <div className = 'col-md-4'>
                   <div className = 'row'>
                       <div className = 'col-sm-8'>
                           Category: {product.category}
                       </div>
                       <div className = 'col-sm-4'> 
                            $ {product.price}
                       </div>
                   </div>
                    <div className="card">
                        <img className="card-img-top" src='https://i.ytimg.com/vi/cav9yTlLLVI/hqdefault.jpg'/>
                        <div className="card-body">
                            <h1> {product.name} </h1>
                        </div>
                    </div>
                </div>

            )
        })
        
        
    }

    render() {
        return (
            <div>
            <h1 className='title'> Products </h1>
                <div className = 'container'>
                    <div className = 'row'>
                        {this.renderProducts()}
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {products: state.products}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators ({fetchProducts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppIndex)

