// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import { fetchProducts } from "../actions/index";


// class ProductCatalog extends Component {

//   componentDidMount() {
//     this.fetchProducts();
//   }

//   // Called after render Method()
//   componentDidUpdate(previousProps, previousState) {

//     if (this.props.query !== previousProps.query) {
//       this.fetchProducts(this.props.query);
//     }
//   }

//   fetchProducts() {
//     this.props.fetchProducts(this.props.query.pageNumber, this.props.query.category)
//   }

//   renderProducts(product, index) {

//     return (

//       <div className="card col-md-3" key={index}
//         style={{ display: 'inline-block', margin: '2%' }}
//       >
//         <div className="card-body">
//           <div className="row">
//             <h3 className="card-text"> ${product.price}</h3>
//             <img
//               className="card-img img-responsive"
//               src={product.image}
//               alt="ugly duckling"
//             />
//           </div>
//           <div className="row">
//             <h5 className="card-title"> {product.name}</h5>
//           </div>
//           <div className="row">
//             <h6 className="card-text"> {product.category}</h6>
//           </div>
//         </div>
//       </div>
//     )
//   }


//   render() {
//     return (
//       <div>
//         {this.props.products.map(this.renderProducts)}
//       </div>
//     );
//   }
// }


// function mapStateToProps({ products, query }) { // { state }
//   return { products: products.products, count: products.count, query }; // { products: this.state.products } from rootReducer
// }

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchProducts }, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ProductCatalog);