import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container } from "react-bootstrap";
import "../css/ProductList.css";
import { searchProducts } from "../actions/index";

class ProductList extends Component {
    constructor(props) {
        super();

        this.renderProducts = this.renderProducts.bind(this);
    }

    //populate html with search results
    renderProducts() {
        //get products
        const products = this.props.products;

        // check if results were fetched and not empty
        if (products && products.length > 0) {

            return products.map((product, index) => {

                return (
                    <Col className="product-col" md={4} key={index}>
                        <Container className="product-container">
                            <Row>
                                <Col className="category-col" sm={9} md={6} lg={8}>
                                    <p className="product-category"><span>Category:</span> {product.category}</p>
                                </Col>
                                <Col className="price-col" sm={3} md={6} lg={4}>
                                    <p className="product-price">${product.price}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <img className="product-image" src={product.image} alt={product.name} />
                                    <h3 className="product-name">{product.name}</h3>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                );
            });
        } else {
            // if no results returned 
            return (
                <Col className="no-results">
                    <p>No results found.</p>
                </Col>
            )
        }
    }

    render() {
        return (
            <Container className="product-list" fluid>
                {/* Display page of products */}
                <Row>

                    {this.renderProducts()}

                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products.product_results
    };

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ searchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
