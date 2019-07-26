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
                    <h1>{product.name}</h1>
                    <div className="card">
                        <img className="card-img-top" src={product.image}/>
                        <div className="card-body">
                            <h5 className="card-title">{product.price}</h5>
                        </div>
                    </div>
                </div>

            )
        })
        
        
    }

    render() {
        return (
                <div className = 'container'>
                        {this.renderProducts()}
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

