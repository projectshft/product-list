import React from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import "../css/ProductList.css";

const ProductList = () => {

    //populate html with search results
    const renderProducts = props.products.map((product) => {
        return (
            <Col md={4} className="product-container">
                <div className="product-details">
                    <p classname="product-category">Category: {product.category}</p>
                    <p classname="product-price">{product.price}</p>
                    <img className="product-image" src={product.image} alt={product.name} />
                    <h3 className="product-name">{product.name}</h3>
                </div>
            </Col>
        );
    });


    return (
        <Container className="product-list" >
            {/* Display page of products */}
            <Row>
                <Col>
                    {renderProducts}
                </Col>
            </Row>
        </Container>
    )
}

function mapStateToProps(state) {
    return {
        products: state.products.productResults
    };
}

export default connect(mapStateToProps)(ProductList);
