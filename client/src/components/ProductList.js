import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function ProductList() {
  const products = useSelector((state) => state.product);

  console.log("product @ productlist: ", products);

  const renderProduct = (productData) => {
    try {
      if (!productData) {
        return null;
      }

      if (Array.isArray(productData)) {
        return productData.map((product) => renderProduct(product));
      }

      const { id, name, price, category, reviews } = productData;

      return (
        <Card key={id} style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Product Info</Card.Title>
            <Card.Text>
              Product: {name} <br />
              Price: {price} <br />
              Category: {category} <br />
              Reviews: {reviews} <br />
            </Card.Text>
            <Button variant="primary">Reviews</Button>
          </Card.Body>
        </Card>
      );
    } catch (error) {
      console.error("Error rendering product:", error);
      return null;
    }
  };

  return (
    <Container>
      <Row>{products.map(renderProduct)}</Row>
    </Container>
  );
}

export default ProductList;
