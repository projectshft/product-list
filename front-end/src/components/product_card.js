import React, { Fragment, Component } from "react";

class ProductCard extends Component {
   render() {
      return (
         <Fragment>
            <div className="col-md-4 col-sm-6">
               <div className="card bg-light h-150">
               <div className="card-body">
                  <h2 className="card-title">Practical Wooden Sausages</h2>
                  <h4>Category: Tools</h4>
                  <h3>$43</h3>
               </div>
               <div>
                  <img className="card-img" src="http://placehold.it/700x400" alt="" />
               </div>
               </div>
            </div>
            <div className="col-md-4 col-sm-6">
               <div className="card bg-light h-150">
               <div className="card-body">
                  <h2 className="card-title">1234567890abcdefghijklmnopqrs</h2>
                  <h4>Category: Tools</h4>
                  <h3>$43</h3>
               </div>
               <div>
                  <img className="card-img" src="http://placehold.it/700x400" alt="" />
               </div>
               </div>
            </div>
            <div className="col-md-4 col-sm-6">
               <div className="card bg-light h-150">
               <div className="card-body">
                  <h2 className="card-title">Product Title</h2>
                  <h4><strong>Category:</strong> Tools</h4>
                  <h3>$43</h3>
               </div>
               <div>
                  <img className="card-img" src="http://placehold.it/700x400" alt="" />
               </div>
               </div>
            </div>
         </Fragment>
      );
   }
}

export default ProductCard;