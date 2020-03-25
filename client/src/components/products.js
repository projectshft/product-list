import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../actions/index'
import _ from 'lodash'

class Products extends Component {
    constructor() {
        super();
        // set the state of pageNumber to page=1 then change based on pagination
        this.state ={
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
                    {/* {this.renderPageToggle()} */}
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
