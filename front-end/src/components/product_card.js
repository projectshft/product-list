import React, { Fragment, Component } from "react";
import { connect } from "react-redux";

class ProductCard extends Component {
   
   renderProductCards() {
      return this.props.products.map(product => {
         return (
            <div key={product._id} className="col-md-4 col-sm-6">
               <div className="card bg-light h-150">
                  <div className="card-body">
                     <h2 className="card-title">{product.name}</h2>
                     <h4>Category: {product.category}</h4>
                     <h3>${product.price}</h3>
                  </div>
                  <div>
                     <img className="card-img" src={product.image} alt="" />
                  </div>
               </div>
            </div>
         )
      })
   }

   render() {
      return (
         <Fragment>
            {this.renderProductCards()}
         </Fragment>
      );
   }
}


function mapStateToProps(state) {
   return { products: state.products.products };
 }

export default connect(mapStateToProps, null)(ProductCard);