import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProduct } from "../actions";

class ProductList extends Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        console.log(this.props.fetchProduct());
        this.props.fetchProduct();
    }

    renderProduct() {
        console.log("render",this.props);

        if(this.props.products) {
            return this.props.products.map(product => {
                return (
                    <div>
                <tr key={product._id}>
                    <td>{product.name} 
                    <p>Category: {product.category}</p>
                    <p>Price: ${product.price}</p>
                    <p><img src={product.image} alt={product.name} height="64" width="64"/></p>
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                </div>
                );
            });
        }
        else {
            return (<div>loading...</div>);
        }
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderProduct()}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps(state) {
    console.log("my state", state);
    return { products: state.products};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ fetchProduct: fetchProduct }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);