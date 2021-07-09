import React from "react";
import { useSelector } from "react-redux";

const ProductData = () => {
  const productData = useSelector((state) => state.productData.products[0]);
  let columns = [];

  if (productData !== undefined) {
    productData.forEach((item, index) => {
      columns.push(
        <div className="col-sm-3 py-3 product" key={item._id}>
          <div className="item-header">
            <h6>{item.category} -</h6>
            <h6>${item.price}</h6>
          </div>
          <div>
            <img src={item.image} alt="product" />
          </div>
          <div>
            <h6>{item.name}</h6>
          </div>
        </div>
      );

      if ((index + 1) % 3 === 0) {
        columns.push(<div className="w-100"></div>);
      }
    });
  }

  if (productData === undefined) {
    return (
      <div className="no-products">
        <h6>No Products Found</h6>
      </div>
    );
  }

  return <div className="row product-data">{columns}</div>;
};

export default ProductData;
