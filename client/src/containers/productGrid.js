//display a set of 9 products

import React, { Component } from 'react';
import ProductCard from '../components/productCard';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts} from '../actions/actions';
import _ from 'lodash';

class ProductGrid extends Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    renderProducts(){
        console.log('products:', this.props.products);

        return _.map(this.props.products, product =>{
            return(
                <ProductCard key={Math.random() * 2} product={product}/>
            )
        })
    }
    render() {
        

        return (
            <section className="Grid album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        {this.renderProducts()}
                    </div>
                </div>
            </section >
        )
    }
}

// ProductGrid.propTypes = {
//     products: PropTypes.arrayOf(PropTypes.shape(ProductCard.propTypes)).isRequired
// }

function mapStateToProps(state) {
    return {
        products: state.products,
        
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchProducts}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);