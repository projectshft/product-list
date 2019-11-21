import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Image from 'react-bootstrap/Image';
import { fetchProducts } from "../actions";

class ProductList extends Component {
    componentDidMount() {
        this.props.fetchProducts();
        console.log('it worked')
    }

    renderProducts() {
        console.log(this.props.products);
        return _.map(this.props.products.products, product => {
            console.log(this.props.products);
            console.log(product);
            return (
                <Col xs={4} md={4}>
                    <Card key={product._id}>
                        <Card.Header>Category: {product.category}<br/> Price: ${product.price}</Card.Header>
                            <Card.Body>
                                <Image src={product.image} fluid/>
                            </Card.Body>
                        <Card.Footer>{product.name}</Card.Footer>
                    </Card>
                </Col>
            );
        });
    }

    render() {
        return (
            <div>
                <CardGroup>
                    <Row>
                        {this.renderProducts()}
                    </Row>
                </CardGroup>
            </div>
        );
    };
};

function mapStateToProps(state) {
    return { products: state.products};
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductList);