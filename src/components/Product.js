import React from 'react'
import Card from "react-bootstrap/Card";

const Product = () => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>
          <div className="card-title">
            <div className="category">
              Category: <strong>Shoes</strong>
            </div>
            <div className="price">
              <strong>791</strong>
            </div>
          </div>
        </Card.Title>
        <Card.Img
          variant="top"
          src="https://via.placeholder.com/250?text=Product+Image"
        />
        <Card.Title>
          <div className="product-name">
            <strong>Concrete Garden Shoe</strong>
          </div>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default Product