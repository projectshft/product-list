import React from "react";
import { useSelector } from "react-redux";
import "./ProductViewStyles.css";

function ProductView(props) {
  const products = useSelector((state) => state.product.products.product);
  const count = useSelector((state) => state.product.products.count);
  const numOfPages = Math.ceil(count / 9);

  //dynamically create links that will set the value of the page into the prop.setPageChange(x)

  const pageNumbers = [];
  for (let i = 1; i <= numOfPages; i++) {
    pageNumbers.push(i);
  }

  const listedPages = pageNumbers?.map((product, index) => {
    return (
      <div key={index} className="page-format">
        <div>
          <h3 value={product}>{product}</h3>
        </div>
      </div>
    );
  });

  const listedProduct = products?.map((product, index) => {
    return (
      <div key={index} className="grid-item">
        <div className="test">
          Category: {product.category} <h2 id="other-test">{product.price}</h2>
        </div>
        {/* <img alt="product" src={product.image}></img> */}
        <h3>{product.name}</h3>
      </div>
    );
  });

  return (
    <div>
      <div className="grid">{listedProduct}</div>
      {/* below is a test to see that handleThePage works. */}
      {/* <div className="pages">{numOfPages ? numOfPages : null}</div> */}
      <div className="page-format">{listedPages}</div>
    </div>
  );
}

export default ProductView;
