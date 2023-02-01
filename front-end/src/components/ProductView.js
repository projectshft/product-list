import React from "react";
import { useSelector } from "react-redux";
import "./ProductViewStyles.css";

function ProductView(props) {
  const products = useSelector((state) => state.product.products.product);
  const count = useSelector((state) => state.product.products.count);
  const numOfPages = Math.ceil(count / 9);

  const pageNumbers = [];
  for (let i = 1; i <= numOfPages; i++) {
    pageNumbers.push(i);
  }

  const getPage = (value) => {
    props.setPageChange(value);
  };

  const listedProduct = products?.map((product, index) => {
    return (
      <div key={index} className="grid-item">
        <div className="top-box">
          <div>
            Category:<b>{product.category}</b>
          </div>
          <div className="price-style">
            <h2>{product.price}</h2>
          </div>
        </div>
        <div className="bottom-box">
          <img alt="product" src={product.image}></img>
          <h3>{product.name}</h3>
        </div>
      </div>
    );
  });
  const listedPages = pageNumbers?.map((product, index) => {
    return (
      <div key={index} className="page-numbers">
        <div className="btn-layout">
          <button
            className="btn"
            value={product}
            onClick={() => {
              getPage(product);
            }}
          >
            {product}
          </button>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="grid">{listedProduct}</div>
      <div className="page-format">
        <div className="page-number-format">{listedPages}</div>
      </div>
    </div>
  );
}

export default ProductView;
