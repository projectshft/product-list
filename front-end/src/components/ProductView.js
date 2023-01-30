import React from "react";
import { useSelector } from "react-redux";
import "./ProductViewStyles.css";

function ProductView() {
  const products = useSelector((state) => state.product.products.product);

  const listedProduct = products?.map((product, index) => {
    return (
      <div key={index} className="grid-item">
        <div className="test">
          Category: {product.category} <h2 id="other-test">{product.price}</h2>
        </div>
        <img alt="product" src={product.image}></img>
        <h3>{product.name}</h3>
      </div>
    );
  });
  return (
    <div>
      <div className="grid">{listedProduct}</div>
      {/* <div className="pages">{numOfPages ? numOfPages : null}</div> */}
    </div>
  );
}

export default ProductView;
