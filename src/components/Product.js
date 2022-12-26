import React from "react";
import Card from "react-bootstrap/Card";

const Product = ({ log }) => {
  return (
    <div className="grid-item">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            <div className="card-title">
              <div className="category">
                Category: <strong>{log.category}</strong>
              </div>
              <div className="price">
                <strong>{log.price}</strong>
              </div>
            </div>
          </Card.Title>
          <Card.Img variant="top" src={log.image} />
          <Card.Title>
            <div className="product-name">
              <strong>{log.name}</strong>
            </div>
          </Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Product;
