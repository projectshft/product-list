import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import _ from "lodash";
import "../css/SearchPage.css";
import { searchProducts } from "../actions/index";
import ProductList from './ProductList'

class SearchPage extends Component {
    constructer(props) {

        super(props)

        //keep track of current (clicked) page
        this.state = {
            // clickedPage: null ***TODO*** Figure out how to send page number as parameter for new search
            //Search Params?? Here or store
        }

        //bind functions
        this.renderPageLinks = this.renderPageLinks.bind(this);
        this.updatePage = this.updatePage.bind(this);
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
            console.log("Time to update page!")
            // this.setState({ clickedPage: pageNumber })
        }

        return (
            <Container className="search-page" >
                <Row>
                    <Col>
                        {/* Search bar, filter, and sort options */}
                        {/* ***TODO***[search bar] --- [dropdown menu (categories)] --- [dropdown menu (sort)] */}

                        {/* Display page of products */}
                       <ProductList />

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
        productCount: state.products.count,
        currentPage: state.currentPage
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ searchBook }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
