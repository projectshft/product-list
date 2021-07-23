import React from "react";
//redux
import { useSelector } from "react-redux";

const ProductCard = () => {
  const { products } = useSelector((state) => state.products);
  const product = products[0].products[0];
  console.log(products[0].products);

  return (
    <div>
      <h2>product card</h2>
      <p>{product.name}</p>
      <p>{product.category}</p>
      <p>${product.price}</p>
      <img src={product.image} alt="product pic"></img>
    </div>
  );
};

export default ProductCard;
