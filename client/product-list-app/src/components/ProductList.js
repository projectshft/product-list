import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import "../css/ProductList.css";
import SearchBar from "./SearchBar";
import { searchProducts } from "../actions/index";

class ProductList extends Component {
    constructer(props) {
        super(props)

        //keep track of current (clicked) page
        this.state = {
            clickedPage: null
        }

        //bind functions
        this.renderPageLinks = this.renderPageLinks.bind(this);
        this.renderProductsFromSearch = this.renderProductsFromSearch.bind(this);
        this.updatePage = this.updatePage.bind(this);
    }

    //populate html with search results
    renderProductsFromSearch() {
        return props.products.map((product) => {
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
    }

    //render list of page links based on number of search results
    renderPageLinks() {
        const numOfPages = Math.ceil(props.pageCount / 9);

        for (let pageNumber = 1; pageNumber <= numOfPages; pageNumber++) {

            //make page number bold if current page
            if (pageNumber === this.props.currentPage) {
                return (
                    <li>
                        <strong>
                            <Link
                                className="page-number"
                                //update current page when page number is clicked
                                onClick={event => {
                                    this.updatePageNumber(pageNumber)
                                }}> {numOfPages}
                            </Link>
                        </strong>
                    </li>
                )
            } else {
                return (
                    <li>
                        <Link
                            className="page-number"
                            //update current page when page number is clicked
                            onClick={event => {
                                this.updatePageNumber(pageNumber)
                            }}> {numOfPages}
                        </Link>
                    </li>
                )
            }
        }

        updatePageNumber (pageNumber) {
            this.setState({ clickedPage: pageNumber })
        }

        return (
            <Container id="main" >
                <Row>
                    <Col>
                        {/* Search bar, filter, and sort options */}
                        <SearchBar />

                        {/* Display page of products */}
                        <Row>
                            <Col>
                                {renderProductsFromSearch}
                            </Col>
                        </Row>

                        {/* Page number links */}
                        <Row>
                            <Col>
                                <ul className="page-links">
                                    {renderPageLinks()}
                                </ul>
                            </Col>

                        </Row>

                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.products.productResults,
        productCount: state.products.count,
        currentPage: state.currentPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ searchBook }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
