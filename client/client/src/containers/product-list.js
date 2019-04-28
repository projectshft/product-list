import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../actions/index";


class ProductList extends Component {

    componentDidMount() {
        this.fetchProducts();
    }

    // Called after render Method()
    componentDidUpdate(prevProps, prevState) {
        // Typical usage (don't forget to compare props):
        console.log('prevProps is: ', prevProps.query) 
        console.log('this.props.query is: ', this.props.query) 
       
        if (this.props.query !== prevProps.query) {
          this.fetchProducts(this.props.query);
      }
    }

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
