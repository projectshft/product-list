import React from "react";
//redux
// import { useSelector } from "react-redux";

const ProductCard = ({ name, category, id, image, price }) => {
  return (
    <div>
      <h2>product card</h2>
      <p>{name}</p>
      <p>{category}</p>
      <p>${price}</p>
      <img src={image} alt="product pic"></img>
    </div>
  );
};

export default ProductCard;
