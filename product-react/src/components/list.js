import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Pagination} from 'react-bootstrap';
import {setPage} from '../actions';
import {bindActionCreators} from 'redux'

class List extends Component {
    constructor(props){
        super(props)

        this.state = {
            currentPage: 1
        }
    }
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
        for ( let i = 1; i < (this.props.total/9); i++){
            pagesArray.push(
                <Pagination.Item key={i} onClick={() => {this.props.setPage(i, this.props.menu.category, this.props.menu.sort); this.setState({currentPage: i})}} active={i === this.state.currentPage}>{i}</Pagination.Item>
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
                    <div className="row justify-content-center">
                    <Pagination className="row text-center justify-content-center">
                    {this.renderPages()}
                    </Pagination>
                    </div>
                </div>
            )
        } else {
            return (
                <h4> Click "Submit" to Search... </h4>
            )
        }
    }
}

function mapStateToProps({products, total, menu}){
    return ({products, total, menu})
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({setPage}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(List);