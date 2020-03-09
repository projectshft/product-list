import _ from 'lodash'
import React, { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProducts } from '../actions/index'
import _ from 'lodash'
import PropTypes from 'prop-types';

class Products extends Component {
    async componentDidMount() {
        await this.props.fetchProducts([]);
    }


    renderProducts() {

        return (
            this.props.products.map(product =>
                <div className="card col-md-3" key={product._id}
                    style={{ display: 'inline-block', margin: '2%' }}
                >
                    <div className="card-body">
                        <div className="row">
                            <h3 className="card-text"> ${product.price}</h3>
                            <img
                                className="card-img img-responsive"
                                src={product.image}

                            />
                        </div>
                        <div className="row">
                            <h5 className="card-title"> {product.name}</h5>
                        </div>
                        <div className="row">
                            <h6 className="card-text"> {product.category}</h6>
                        </div>
                    </div>
                </div>




            )

        )
    }


    render() {
        return (
            <div>
                {this.renderProducts()}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
}


function mapStateToProps({ products }) {
    return { products };
}


export default connect(mapStateToProps, mapDispatchToProps)(Products);
