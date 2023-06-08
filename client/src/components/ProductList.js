import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { fetchProduct } from "../actions";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";

function ProductList() {
  const products = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [sortOption, setSortOption] = useState("");
  const [filter, setFilter] = useState("");

  const handleSortOptionChange = (option) => {
    setSortOption(option);
    dispatch(fetchProduct( null,{ priceSort: option }));
  };

  const handleFilter = (typeOfItem) => {
    setFilter(typeOfItem);
    dispatch(fetchProduct({item:null},{ category: typeOfItem }));
  };

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
      <Row>
        <Col>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sort By:
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSortOptionChange("highest")}>
                Highest Price
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortOptionChange("lowest")}>
                Lowest Price
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row></Row>
      <Row>{products.map(renderProduct)}</Row>
    </Container>
  );
}

export default ProductList;
