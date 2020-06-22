import React, { Component } from "react";
import { Row, Col, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../css/SearchPage.css";
import { searchProducts } from "../actions/index";
import ProductList from './ProductList'


class SearchPage extends Component {
    constructor(props) {
        super(props)

        //keep track of current (clicked) page
        this.state = {
            category: "",
            query: "",
            price: "",
            page: 1
        }

        //bind functions
        this.renderPageLinks = this.renderPageLinks.bind(this);
        this.updatePageNumber = this.updatePageNumber.bind(this);
        this.setCategory = this.setCategory.bind(this);
        this.setQuery = this.setQuery.bind(this);
        this.populateCategories = this.populateCategories.bind(this);
    }

    //default search to get unfiltered products on page load
    componentDidMount() {
        this.props.searchProducts(this.state);
    }

    //render list of page links based on number of search results
    renderPageLinks() {

        //get page numbers based on total results and round up result
        const numOfPages = Math.ceil(this.props.productCount / 9);

        //array of page numbers to map html to
        const pageNumbers = [];

        //get current page to style link
        const currentPage = this.state.page;

        //create array of sequential numbers to use for page links
        for (let pageNumber = 1; pageNumber <= numOfPages; pageNumber++) {
            pageNumbers.push(pageNumber);
        }

        //create page links
        return pageNumbers.map((page, index) => {

            //make current page number bold
            const pageStatus = () => { return page === currentPage ? "bold-number" : '' }

            return (
                <li className={`page-number ${pageStatus()}`} key={index}>
                    <Link to=""
                        className="page-number-link"
                        //update current page when page number is clicked
                        onClick={event => {
                            this.updatePageNumber(page)
                        }}> {page}
                    </Link>
                </li>
            )
        });
    }

    //to update current page on click and get updated search results
    updatePageNumber(pageNumber) {
        this.setState(
            { page: pageNumber },
            () => {
                this.props.searchProducts(this.state);
            }
        );
    }

    //to set category filter and get filtered search results
    setCategory(newCategory) {
        //reset page number to 1 on each filter change
        this.setState({ category: newCategory, page: 1 },
            () => {
                this.props.searchProducts(this.state)
            }
        );
    }

    //to set sort parameter and get sorted search results
    setSort(newSort) {
        //reset page number to 1 on each new sort
        this.setState({ price: newSort, page: 1 },
            () => {
                this.props.searchProducts(this.state);
            }
        );
    }

    //to set new search term and get search results based on query
    setQuery(newQuery) {
        //reset page number to 1 on each new search
        this.setState({ query: newQuery, page: 1 },
            () => {
                this.props.searchProducts(this.state);
            }
        );
    }

    //to render categories in dropdown menu
    populateCategories() {
        //get categories
        const availableCategories = this.props.categories

        //check if categories have been fetched
        if (availableCategories) {
            //map categories to dropdown list
            return this.props.categories.map(category => {
                return (
                    <option>{category}</option>
                );
            });
        } else {
            return (
                <option value="">(no categories available)</option>
            )
        }
    }


    render() {
        return (
            <Container className="search-page" fluid >
                <Row>
                    <Col>
                        {/* Search bar, filter, and sort options */}
                        <Row className="search-nav">

                            {/* Search bar */}
                            <Col md={4}>
                                <Form onSubmit={event => { event.preventDefault(); }}>
                                    <Form.Group controlId="searchBar.ControlInput1">

                                        <Form.Label>Search:</Form.Label>

                                        {/* Set state of query property when input is updated */}
                                        <Form.Control
                                            value={this.state.query}
                                            onChange={event => {
                                                this.setQuery(event.target.value);
                                            }}
                                            type="search"
                                        />
                                    </Form.Group>
                                </Form>
                            </Col>

                            {/* Category Filter */}
                            <Col md={4}>
                                <Form onSubmit={event => { event.preventDefault(); }}>
                                    <Form.Group controlId="sortBy.ControlSelect2">

                                        <Form.Label>Filter by Category:</Form.Label>

                                        {/* Set state of category property when input is updated */}
                                        <Form.Control
                                            as="select"
                                            value={this.state.category}
                                            onChange={event => {
                                                this.setCategory(event.target.value);
                                            }}
                                        >
                                            {/* option to remove category filter */}
                                            <option value="">(Show All)</option>

                                            {/* render all available categories */}
                                            {this.populateCategories()}

                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </Col>

                            {/* Sort Filter */}
                            <Col md={4}>
                                <Form onSubmit={event => { event.preventDefault(); }}>
                                    <Form.Group controlId="sortBy.ControlSelect2">
                                        <Form.Label>Sort by:</Form.Label>

                                        {/* Set state of sort property when input is updated */}
                                        <Form.Control
                                            as="select"
                                            value={this.state.price}
                                            onChange={event => {
                                                this.setSort(event.target.value);
                                            }}
                                        >

                                            {/* Sort filters  */}
                                            <option value="">(none)</option> {/* option to remove sort filter */}
                                            <option value="lowest">Price: Low to High</option>
                                            <option value="highest">Price: High to Low</option>

                                        </Form.Control>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                        {/* Display page of products */}
                        <Row>
                            <Col md={12}>

                                <ProductList />
                            </Col>
                        </Row>

                        {/* Page number links */}
                        <Row>
                            <Col>
                                <ul className="page-links">
                                    {this.renderPageLinks()}
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
        categories: state.products.categories
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ searchProducts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
