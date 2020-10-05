import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions'
import {
  Card,
  CardImg,
  CardBody,
  Col,
  Container,
  Row,
} from 'reactstrap';
class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aTest: "just a test"
    }
  
  // console.log('props.products @ catalog =', this.props.products)
  // if (this.props.products.list.length === 0) {
  //     console.log('trying to trigger fetchProducts()')
  //     fetchProducts(null, null, null);
  //     console.log(' ->and got props.products', this.props.products)}
    }

      render() {
      console.log('catalog props.products ',this.props.products)

      return (
        <div className="album py-5 bg-light">
            <Container>
                <Row>
                    {this.props.products.list.map((item, key) => {
                        return (
                            <Col md="4" key={key}>
                                <Card className="mb-4 box-shadow">
                                <Row><Col><p className="ml-3 mt-3 pt-1">Category: {item.category}</p></Col>
                                <Col><h2 className="text-right mr-3 pt-1">${item.price}</h2></Col></Row>
                                <CardBody style={{marginTop: '-35px'}}>
                                    <CardImg
                                        top
                                        width="100%"
                                        src={item.image}
                                        alt={item.name}
                                    />
                                    </CardBody>
                                    <h3 className="text-center" style={{marginTop: '-20px'}}>{item.name}</h3>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
};
};
function mapStateToProps(state) {
  return { products: state.products }
};
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts });
}
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);