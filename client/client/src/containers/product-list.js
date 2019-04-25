import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions/index";


class ProductList extends Component {

    componentDidMount() {
        this.fetchProducts();
    }

    // componentDidUpdate() {
    //     this.fetchProducts()
    // }

    fetchProducts() {
        this.props.fetchProducts(this.props.query.pageNumber, this.props.query.category)
    }

    renderProducts(product) {
        console.log('ProductDATA: ', product)

       

                return (
                    // 3 rows
                    <div className="row">
                        <div className="col-3">
                            <div className="card">
                                <ul>{product.name}</ul>
                                <ul>${product.price}</ul>
                                <ul>{product.category}</ul>
                                <img src={product.image} alt="ugly pic"/>
                            </div>
                        </div>
                    </div>
                    // 3 columns flex-evenly
                    // 1 card per column

                    // <div className="col-3 card border-35"
                    //           style={{ backgroundColor: "red" }}
                    //           > 
                    //     <ul>{product.name}</ul>
                    //     <ul>${product.price}</ul>
                    //     <ul>{product.category}</ul>
                    //     <img src={product.image} alt="ugly pic"/>
                    //     <br></br>
                    //     <hr></hr>
                    // </div>      

                )               
            
    }         
      

  render() {
    return (
        <div>
             {this.props.products.map(this.renderProducts)} 
        </div>
        
    );
  }
}


function mapStateToProps({ products, query }) { // { state }
  return { products: products.products, count: products.count, query }; // { products: this.state.products } from rootReducer
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
