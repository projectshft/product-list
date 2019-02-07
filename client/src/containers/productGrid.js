//display a set of 9 products

import React, { Component } from 'react';
import ProductCard from '../components/productCard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {fetchProducts} from '../actions/actions';

class ProductGrid extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        console.log('products:', this.props.products);

        return (
            <section className="Grid album py-5 bg-light">
                <div className="container">
                    <div className="row">

                        {this.props.products.map((product) =>
                            <ProductCard key={Math.random() * 2} product={product}
                            />
                        )}
                    </div>
                </div>
            </section >
        )
    }
}

ProductGrid.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape(ProductCard.propTypes)).isRequired
}

function mapStateToProps(state) {
    return {
        products: state.products,
        isLoading: state.isLoading,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchProducts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);