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
import Pagination from "react-bootstrap/Pagination";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);
  console.log('prodicts',products); 

  const [sortOption, setSortOption] = useState("");
  const [filter, setFilter] = useState("");

  const handleSortOptionChange = (option) => {
    setSortOption(option);
    dispatch(fetchProduct(null, option));
  };

  const handleFilter = (typeOfItem) => {
    setFilter(typeOfItem);
    dispatch(fetchProduct(null, null, typeOfItem));
  };

  const handlePagination = () => {};
  //   let active = 2;
  //   let items = [];
  //   for (let number = 1; number <= 5; number++) {
  //     items.push(
  //       <Pagination.Item key={number} active={number === active}>
  //         {number}
  //       </Pagination.Item>
  //     );
  //   }
  //   const pagination = () => {

  // };

  const renderProduct = (productData) => {
    try {
      if (!productData) {
        return null;
      }

      if (Array.isArray(productData.products)) {
        return productData.products.map((product) => renderProduct(product));
      } 

      const { id, name, price, category, reviews } = productData;
      const { count, totalPages } = productData;
      console.log(count, totalPages); 

      return (
        <>
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
        </>
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

          <Dropdown className="filter">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Category:
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleFilter("Garden")}>
                Garden
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilter("Sports")}>
                Sports
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
