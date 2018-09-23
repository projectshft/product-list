// import React, { Component } from "react";
// import { connect } from "react-redux";

// class ProductList extends Component {
//     renderProducts(product) {
//         const name = product.map(product => product.name);
//         const category = product.map(product => product.category);
//         const price = product.map(product => product.price);
//         const img = product.map(product => product.image);
    
//         return (
//             <tr key = {product._id}>
//                 <td> {name} </td>
//                 <td> {category} </td>
//                 <td> {price} </td>
//                 <td> {img} </td>
//             </tr>
//         );
//     }
//     render() {
//         return (
//             <table>
//             <tr>
//                 <th>Name</th>
//                 <th>Category</th>
//                 <th>Price</th>
//                 <th>Image</th>
//             </tr>
//             <tbody>
//                 {this.props.product.map(this.renderProducts)}
//             </tbody>
//             </table>
//         );
//     }
// }

// function mapStateToProps({ products }) {
//     return { products };
// }

// export default connect(mapStateToProps)(ProductList);