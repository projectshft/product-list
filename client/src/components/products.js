import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../actions/index'
import _ from 'lodash'

class Products extends Component {
    constructor() {
        super();


        // this.handleClickForPagination = this.handleClickForPagination.bind(this)
    }

    async componentDidMount() {
        await this.props.fetchProducts()
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
