import React from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { render } from "react-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

//import Block from "react-blocks";
function ProductList() {
  const product = useSelector((state) => state.product);

  console.log("product: ", product);
  //debugger;

  const renderProduct = (productData) => {
    if (!productData) {
      return null; // Return null or handle the case when productData is undefined
    }
  
    const { name, price, category, reviews } = productData;

    return (
      <Card.Text key={productData.id}>
        Product: {name} <br></br>
        Price: {price} <br></br>
        category: {category} <br></br>
        Reviews: {reviews} <br></br>
      </Card.Text>
    );
  };

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Product Info</Card.Title>
        <Button variant="primary">Reviews</Button>
        {product.map(renderProduct)}
      </Card.Body>
    </Card>
  );
}
export default ProductList;
