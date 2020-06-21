import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container } from "react-bootstrap";
import "../css/ProductList.css";
import { searchProducts } from "../actions/index";

class ProductList extends Component {
    constructor(props) {
        super(props)

        this.renderProducts = this.renderProducts.bind(this);
    }

    //populate html with search results
    renderProducts() {

        // check for results
        if (this.props.products.length > 0) {

            return this.props.products.map((product, index) => {

                return (
                            <Col className="product-col" md={4} key={index}>
                        <Container className="product-container">
                                    <Row>
                                        <Col className="category-col" md={8}>
                                            <p className="product-category"><span>Category:</span> {product.category}</p>
                                        </Col>
                                        <Col className="price-col" md={4}>
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
                <p className="no-results">No results found.</p>
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
        products: state.products.productResults
    };

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ searchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
