import React, { Component } from "react";
import { connect } from "react-redux";


class ProductList extends Component {

    renderProducts(productData) {
        console.log('ProductDATA: ', productData)

        return (

            productData.map(product => {

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
            })
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


function mapStateToProps({ products }) { // { state }
  return { products }; // { products: this.state.products } from rootReducer
}

export default connect(mapStateToProps)(ProductList);
