import React from "react";
import Card from "react-bootstrap/Card";

const Product = ({ item }) => {
  return (
    <div className="grid-item">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            <div className="card-title">
              <div className="category">
                Category: <strong>{item.category}</strong>
              </div>
              <div className="price">
                <strong>{item.price}</strong>
              </div>
            </div>
          </Card.Title>
          <Card.Img variant="top" src={item.image} />
          <Card.Title>
            <div className="product-name">
              <strong>{item.name}</strong>
            </div>
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
