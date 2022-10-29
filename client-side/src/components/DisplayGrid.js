import { useSelector } from "react-redux";
import React from "react";

const DisplayGrid = () => {
  const temp = useSelector((state) => state.products.products);

  if (temp) {
    return temp.map((product) => {
      return (
        <div className="try">
          <div className="col--3">
            <div className="card">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR6phDeYUg6EL4uNj6tdRmksE-PI9qjrbgwA&usqp=CAU"
                className="card-img-top"
                alt="your product"
              ></img>
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">category: {product.category}</p>
              </div>
              <div className="card-footer">
                <small className="text-muted">price: ${product.price}</small>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  return null;
};

export default DisplayGrid;
