import React from "react";
import { useSelector } from "react-redux";
import "./ProductViewStyles.css";

function ProductView(props) {
  const products = useSelector((state) => state.product.products.product);
  const count = useSelector((state) => state.product.products.count);

  // Use this to dynamically create an array of numbers that will populate according to product and map in the DOM.
  // const numOfPages = Math.ceil(count / 9);

  //dynamically create links that will set the value of the page into the prop.setPageChange(x)
  // const handleThePage = () => {
  //   props.setPageChange();
  // };
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
      {/* below is a test to see that handleThePage works. */}
      <div className="pages">
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </div>
    </div>
  );
}

export default ProductView;
