import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Card,
    CardImg,
    CardBody,
    Col,
    Container,
    Row,
} from 'reactstrap';
import { fetchProducts } from '../actions';
// const Album = ({ album }) => {
    
const Album = props => {
    return (
        <div className="album py-5 bg-light">
            <Container>
                <Row>
                    {props.products.list.map((item, key) => {
                        return (
                            <Col md="4" key={key}>
                                <Card className="mb-4 box-shadow">
                                <Row><Col><p class="ml-3 mt-3 pt-1">Category: {item.category}</p></Col>
                                <Col><h2 class="text-right mr-3 pt-1">${item.price}</h2></Col></Row>
                                <CardBody style={{marginTop: '-35px'}}>
                                    <CardImg
                                        top
                                        width="100%"
                                        src={item.image}
                                        alt={item.name}
                                    />
                                    </CardBody>
                                    <h3 class="text-center" style={{marginTop: '-20px'}}>{item.name}</h3>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </div>
    );
};

function mapStateToProps(state) {
    console.log('album mapstatetoprops state.products is ', state.products)
    return {
     products: state.products
    };
  }
  
  function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProducts }, dispatch);
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Album);
  
