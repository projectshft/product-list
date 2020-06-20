import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import "../css/ProductList.css";




const ProductList = () => {
    //***TODO***: replace fake data with props
    const testprops = {
        products: [
            {
                category: "clothing",
                name: "hat",
                price: 15,
                image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
            },
            {
                category: "clothing",
                name: "hat",
                price: 15,
                image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
            },
            {
                category: "clothing",
                name: "hat",
                price: 15,
                image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
            },
            {
                category: "clothing",
                name: "hat",
                price: 15,
                image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
            },
            {
                category: "clothing",
                name: "hat",
                price: 15,
                image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
            },
            {
                category: "clothing",
                name: "hat",
                price: 15,
                image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
            },
            {
                category: "clothing",
                name: "hat",
                price: 15,
                image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
            },
            {
                category: "clothing",
                name: "hat",
                price: 15,
                image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
            },
            {
                category: "clothing",
                name: "hat",
                price: 15,
                image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
            }
        ]
    }

    //populate html with search results
    const renderProducts = testprops.products.map((product) => {
        return (
            <Col md={4} className="product-container" key={Math.random() * 1000}>
                <div className="product-details">
                    <Container className="product-info">
                        <Row>
                            <Col sm={9}>
                            <p className="product-category">Category: {product.category}</p>
                            </Col>
                            <Col sm={3}>
                            <p className="product-price">{product.price}</p>
                            </Col>
                        </Row>
                    </Container>
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
                
                    {renderProducts}
               
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
