import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../actions/index'
import _ from 'lodash'

class Products extends Component {
    constructor() {
        super();
        // set the state of pageNumber to page=1 then change based on pagination
        this.state = {
            pageNumber: "page=1"
        }

        //binging the function so we can pass state as an argument 
        this.executePagination = this.executePagination.bind(this)
    }

    async componentDidMount() {
        await this.props.fetchProducts()
    }

    //Executes pagination once the page is clicked
    executePagination() {
        this.props.fetchProducts(this.state.pageNumber)
    }

    renderPageToggle() {

        //need a way to display the next 9 products out of the the total product Count
        let pageCount = [];
        let productCount = this.props.products.productCount
        
        // This loop sections each page out to list nine products based on the total productCount
        for (let i = 1; i <= Math.ceil((productCount / 9)); i++) {
            pageCount.push(i)
        }
        //Itereate over the page number and great a JSX element for each page Ref
        const pageCountList = pageCount.map(number => {
            return (
                <li className="page-link text-center"
                    key={number}
                    value={number}
                    onClick={event => this.setState({ pageNumber: 'page=' + event.target.value }, () => { this.executePagination() })}> {number}
                </li>


            );
        });
        return (
                <div className="row">
                    <div className="col-auto">
                        {pageCountList}
                    </div>
                </div>
        )





    }

    renderProducts() {

        return _.map(this.props.products.products, product => {
            return (
                <div className="col-md-3" key={product._id}
                    style={{ display: 'inline-block', margin: '2%' }}>
                    <div>
                        <div>
                            <h3> ${product.price}</h3>
                            <img
                                className="card-img img-responsive"
                                src={product.image}

                            />
                        </div>
                        <div className="row">
                            <h5> {product.name}</h5>
                        </div>
                        <div className="row">
                            <h6> {product.category}</h6>
                        </div>
                    </div>
                </div>
            )
        }
        )

    }

    render() {
        return (
            <div>
                <div>
                    {this.renderProducts()}
                    {this.renderPageToggle()}
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return state
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Products);
