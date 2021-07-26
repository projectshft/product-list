import React from "react";
import styled from "styled-components";

const ProductCard = ({ name, category, id, image, price }) => {
  return (
    <StyledProductCard>
      <div className="card-top">
        <p>
          <strong>Category:</strong> {category}
        </p>
        <p className="price">${price}</p>
      </div>
      <img src={image} alt="product pic"></img>
      <h2>{name}</h2>
    </StyledProductCard>
  );
};

const StyledProductCard = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  min-height: 30vh;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  overflow: hidden;
  background-color: #f8f8fe;
  .card-top {
    display: flex;
    justify-content: space-between;
    .price {
      font-size: 25px;
    }
  }
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
  h2 {
    margin-top: 1rem;
  }
`;

export default ProductCard;
