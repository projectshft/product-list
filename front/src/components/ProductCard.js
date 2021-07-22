import React from "react";

export default function ProductCard(props) {
  const { category, name, price, image } = props;

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="row ">
        <div className="column col-md-8 align-self-center">
          <span>
            Category: <span className="fw-bold">{category}</span>
          </span>
        </div>
        <div className="column col-md-4">
          <h2>{price}</h2>
        </div>
      </div>

      <img className="card-img-top" src={image} alt="Card cap" />
      <div className="card-body">
        <h1 className="card-title">{name}</h1>
      </div>
    </div>
  );
}
