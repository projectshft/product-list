import React from 'react';
import { Card } from 'react-bootstrap';

const Products = () => {
  function renderProducts() {
    return (
      <div className="container">
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Text>Category: Fitness</Card.Text>
            <Card.Text>$1</Card.Text>
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/250?text=Product+Image"
            />
            <Card.Title>Product Title</Card.Title>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return <div>{renderProducts()}</div>;
};

export default Products;
