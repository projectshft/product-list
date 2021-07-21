import React from "react";

export default function ProductCard() {
  const sampleProduct = {
    reviews: [
      {
        _id: "60f829f5beeb351c74a38106",
        userName: "Jeremy20",
        text: "This is great!",
        product: "60f6cc9d126fc277b8a68f83",
        __v: 0,
      },
    ],
    _id: "60f6cc9d126fc277b8a68f83",
    category: "Games",
    name: "Small Steel Mouse",
    price: 259,
    image: "https://via.placeholder.com/250?text=Product+Image",
    __v: 21,
  };
  const category = sampleProduct.category;
  const price = sampleProduct.price;
  const imgUrl = sampleProduct.image;
  const name = sampleProduct.name;

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

      <img className="card-img-top" src={imgUrl} alt="Card cap" />
      <div className="card-body">
        <h1 className="card-title">{name}</h1>
      </div>
    </div>
  );
}
