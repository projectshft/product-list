import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setPage} from '../actions/requestConfig';
import {fetchProducts} from '../actions/fetch';

class Main extends Component {
    constructor(props) {
      super(props);
      this.props.fetchProducts(this.props.requestConfig);
    }

    renderProductList() {
        if(this.props.products.length > 0){
            return this.props.products.map(product => {
                return (
                    <div className="col-4 product-object" key={product._id}>
                        <div className="float-left"> Category: {product.category} </div>
                        <div className="text-right"> ${product.price} </div>
                        <img className="justify-content-center" src={product.image} alt={product.name}/>
                        <h4 className="text-center"> {product.name} </h4>
                    </div>
                )
            })
        } else {
            return(
                <h1 key="none"> No Products Found </h1>
            )
        }
    }

    handlePageClick = async (data) => {
        await this.props.setPage(data.selected+1);
        this.props.fetchProducts(this.props.requestConfig);
    }

    render() {
        if(this.props.products.length > 0 ) {
            return (
                <div>
                    <div className="row">{this.renderProductList()}</div>
                    <div className="d-flex justify-content-center text-center">
                        <ReactPaginate previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={<a href="">...</a>}
                            breakClassName={"break-me"}
                            pageCount={this.props.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                    </div>
                </div>
            )
        } else {
            return (
                <h1 className="text-center"> Please search a product. </h1>
            )
        }
    }
}

function mapStateToProps({requestConfig, products, pageCount}){
    return {requestConfig, products, pageCount}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({setPage, fetchProducts}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)