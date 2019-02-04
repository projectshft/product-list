//display a set of 9 products

import React from 'react';
import Product from './product';
import PropTypes from 'prop-types';


const ProductGrid = ({ products }) => (
    //  <section className="Grid album py-5 bg-light">
    //     <div className="container">
    //         <div className="row">
    //         {/* this will probably return all the same product */}
    //             <div className="col-md-4"><Product /></div>
    //             <div className="col-md-4"><Product /></div> 
    //             <div className="col-md-4"><Product /></div>

    //             <div className="col-md-4"><Product /></div>
    //             <div className="col-md-4"><Product /></div> 
    //             <div class="col-md-4"><Product /></div>

    //             <div className="col-md-4"><Product /></div>
    //             <div className="col-md-4"><Product /></div> 
    //             <div className="col-md-4"><Product /></div>
    //         </div>
    //     </div>
    // </section>

    <div>
        <h3>Product List</h3>
        <ul>
            {products.map((product) =>
                <li key={product._id}>
                    {product.name} {product.category} {product.price}
                </li>
            )
            }
        </ul>
    </div>

);

ProductGrid.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape(Product.propTypes)).isRequired
};
export default ProductGrid