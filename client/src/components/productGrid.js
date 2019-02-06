//display a set of 9 products

import React from 'react';
import ProductCard from './productCard';
import PropTypes from 'prop-types';


const ProductGrid = ({ products }) => {
    console.log('products:' , products);

    return (
        <section className="Grid album py-5 bg-light">
            <div className="container">
                <div className="row">
                    {products.map((product) =>
                        <ProductCard key={Math.random() * 2} product={product} />
                    )}
                </div>
            </div>
        </section >

    )
}

ProductGrid.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape(ProductCard.propTypes)).isRequired
}

export default ProductGrid