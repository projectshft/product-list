import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Pagination} from 'react-bootstrap'

class List extends Component {
    renderProducts() {
        let productsArray = this.props.products.map((product) => {
            return (
                <div className='col-xs-3 col-xs-offset-1 text-center justify-content-center top-buffer shadow outline' key={product._id}>
                    <p>Category: {product.category} <strong>Price: {product.price}</strong></p>
                    <img src={product.image} />
                    <h4>{product.name}</h4>
                </div>
            )
        })
        return productsArray;
    }

    renderPages() {
        let pagesArray = []
        debugger;
        for ( let i = 0; i < (this.props.total/9); i++){
            pagesArray.push(
                <Pagination.Item active={false}>{i}</Pagination.Item>
            )
        }
        return pagesArray;
    }
    render() {
        if (this.props.products !== null) {
            return (
                <div>
                    <div className="row">
                    {this.renderProducts()}
                    </div>
                    <Pagination className="row text-center justify-content-center">
                    {this.renderPages()}
                    </Pagination>
                </div>
            )
        } else {
            return (
                <h4> LOADING.... </h4>
            )
        }
    }
}

function mapStateToProps({products, total}){
    return ({products, total})
}

export default connect(mapStateToProps)(List);