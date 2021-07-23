import React from "react";
import styled from "styled-components";

const ProductCard = ({ name, category, id, image, price }) => {
  return (
    <StyledProductCard>
      <h2>{name}</h2>
      <p>{category}</p>
      <p>${price}</p>
      <img src={image} alt="product pic"></img>
    </StyledProductCard>
  );
};

const StyledProductCard = styled.div`
  min-height: 30vh;
  text-align: center;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`;

export default ProductCard;
