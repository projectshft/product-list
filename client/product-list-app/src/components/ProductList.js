import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Container } from "react-bootstrap";
import "../css/ProductList.css";
import { searchProducts } from "../actions/index";




// const testprops = {
//     products: [
//         {
//             category: "clothing",
//             name: "hat",
//             price: 15,
//             image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
//         },
//         {
//             category: "clothing",
//             name: "hat",
//             price: 15,
//             image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
//         },
//         {
//             category: "clothing",
//             name: "hat",
//             price: 15,
//             image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
//         },
//         {
//             category: "clothing",
//             name: "hat",
//             price: 15,
//             image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
//         },
//         {
//             category: "clothing",
//             name: "hat",
//             price: 15,
//             image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
//         },
//         {
//             category: "clothing",
//             name: "hat",
//             price: 15,
//             image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
//         },
//         {
//             category: "clothing",
//             name: "hat",
//             price: 15,
//             image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
//         },
//         {
//             category: "clothing",
//             name: "hat",
//             price: 15,
//             image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
//         },
//         {
//             category: "clothing",
//             name: "hat",
//             price: 15,
//             image: "https://images-na.ssl-images-amazon.com/images/I/71ueFZqdU1L._AC_UX385_.jpg"
//         }
//     ]
// }
//***TODO***: replace fake data with props

class ProductList extends Component {
    constructor(props) {
        super(props)

        this.renderProducts = this.renderProducts.bind(this);
    }

    // componentDidMount() {
    //     this.props.searchProducts();
    //   }

    //populate html with search results
    renderProducts() {
        console.log("THIS (PRODUCT LIST):", this);
        console.log("PROPS (PRODUCT LIST):", this.props);


        if (this.props.products !== undefined) {

            return this.props.products.map((product) => {
    
                return (
                    <Col md={4} className="product-container" key={Math.random() * 1000}>
                        <div className="product-details">
                            <Container className="product-info">
                                <Row>
                                    <Col sm={10}>
                                        <p className="product-category">Category: {product.category}</p>
                                    </Col>
                                    <Col sm={2}>
                                        <p className="product-price">${product.price}</p>
                                    </Col>
                                </Row>
                            </Container>
                            <img className="product-image" src={product.image} alt={product.name} />
                            <h3 className="product-name">{product.name}</h3>
                        </div>
                    </Col>
                );
            });
        } else {
            return (
                <h1>PAGE LOADED</h1>
            )
        }
    }

    render() {
        return (
            <Container className="product-list" >
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
