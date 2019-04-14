import React, { Component } from "react";
import { connect } from "react-redux";


class ProductList extends Component {

    renderProducts(productData) {
        console.log('ProductDATA: ', productData)

        return (

            productData.map(product => {

                return (
                       
                    <div className="col-2 card player-card border-35"
                              style={{ backgroundColor: "red" }}
                              > 
                        <ul>{product.name}</ul>
                        <ul>${product.price}</ul>
                        <ul>{product.category}</ul>
                        <img src={product.image} alt="ugly pic"/>
                        <br></br>
                        <hr></hr>
                    </div>      

                )               
            })
        )   
    }         
      

  render() {
    return (
        <div>
            Shop ugly products and save!
            <br></br>
            <hr></hr>
             {this.props.products.map(this.renderProducts)} 
        </div>
        
    );
  }
}


function mapStateToProps({ products }) { // { state }
  return { products }; // { products: this.state.products } from rootReducer
}

export default connect(mapStateToProps)(ProductList);
