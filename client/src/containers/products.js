import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";


class Products extends Component {

	renderList() {
		return _.map(this.props.products, currentProduct => {
			return (
                <div key={currentProduct._id} className="row-col-4">
                    <h6>Category: {currentProduct.category}</h6>
                    <h5>$ {currentProduct.price}</h5>
                    <img src="https://www.oysterdiving.com/wp-content/uploads/Deep-sea-diving.jpg" style={{width: "25%", height: "25%"}} />
                    <h4>{currentProduct.name}</h4>
                </div>
			);
	    }); 
	}

  render() {
    return (
        <div className="container">
            {this.renderList()}
        </div>
    );
  }
}

function mapStateToProps( { products } ) {
  return{
	products
  } 
}


export default connect(mapStateToProps)(Products);

