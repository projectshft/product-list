import React, { Component } from "react";
// import { bindActionCreators } from "redux";
// import { fetchProducts } from "../actions";

class ProductList extends Component {
    // constructor(props) {
    //     super(props);
    // }
    
    componentDidMount() {
        // console.log(this.props.fetchProducts());
        // this.props.fetchProducts();
    }


    // renderProducts() {
    //     console.log('render',this.props);

    //     if(this.props.products) {
    //         return this.props.products.map(product => {
    //             return (
    //                 <div>
    //             <tr key={product._id}>
    //                 <td>{product.name} 
    //                 <p>Category: {product.category}</p>
    //                 <p>Price: ${product.price}</p>
    //                 <p><img src={product.image} alt={product.name}/></p>
    //                 </td>
    //                 <td></td>
    //                 <td></td>
    //             </tr>
    //             </div>
    //             );
    //         });
    //     }
    //     else {
    //         return (<div>loading...</div>);
    //     }
    // }
}

// function mapStateToProps(state) {
//     console.log("products state", state);
//     return { products: state.products};
// }

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({ fetchProducts: fetchProducts }, dispatch);
// }

export default ProductList;