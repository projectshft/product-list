import React from "react";
import { connect } from "react-redux"

class ResultsList extends React.Component {
    constructor(props) {
        super(props)
    }

   renderProducts() {
    if (this.props.products.products !== undefined) { 
        return this.props.products.products.map( product => {
            return (
                <div className="col-md-3 card m-4 height" >
                    <div className="card-header">
                        <p>Category: {product.category} <span className="float-right"><h4>${product.price}</h4></span></p>
                    </div>
                    <img className="card-image-top p-2" src={product.image} alt=" Not Found"/>
                    <div className="card-body">
                        <p className="card-text text-center">{product.name}</p>
                    </div>
                </div>
 
            )
        })
    }
   }

    render () {
        return (
            <div className="row ml-4">
                {this.renderProducts()}
            </div>
        )
    }
};

function mapStateToProps( state ) {
    return {
        products: state.products
    }
}

export default connect( mapStateToProps )( ResultsList )