import React from "react";
import { connect } from "react-redux";

const ProductsGrid = (props) =>  {

  const renderProducts = () => {
  //page may render before categories are fetched from database. use default value if not yet loaded.
    let products = props.products || [];
    return products.map( (product) => {
      return (
        <div className="col-md-3 m-3 text-center border bg-white product" key={product._id}>
          <p>
            <span className="float-left">Category: {product.category}</span>
            <span className="float-right">${product.price}</span>
          </p>
          <img className="img-thumbnail product-image text-truncate" src={product.image} alt={product.name} />
          <h4 className="text-center">{product.name}</h4>
        </div>
      )
    });

  }

  return (
    <div className="container">
      <div className="row d-flex justify-content-center bg-light border-custom products-grid">
        {renderProducts()}
      </div>
    </div>
  )
}

//state.products is an object containing a products array and a total product count. We just want the products array here.
function mapStateToProps(state) {
  return {
    products: state.products.products
  }
}


export default connect(mapStateToProps)(ProductsGrid);