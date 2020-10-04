import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProducts } from '../actions';
import Album from './Album';
import CategorySelector from './CategorySelector'
import SortHighLow from './SortHighLow'
import SearchBox from './SearchBox'
import CatalogIndex from './CatalogIndex'
import { Container, Row, Col, Jumbotron } from 'reactstrap';

const Main = props  => {
    return (
        <main role="main">
            <Jumbotron className="text-center">
                <Container>
                    <h1 className="jumbotron-heading">Wonderous Products</h1>
                    <p className="lead text-muted">
                        Shop from the most fabulously, randomly summoned catalog. Premium prices, bargain products, and movies about concrete await!
                    </p>
                </Container>
            </Jumbotron>
            <Container>
                <Row>
                    <Col xs="6" sm="4"><SearchBox></SearchBox></Col>
                    <Col xs="6" sm="4"><CategorySelector></CategorySelector></Col>
                    <Col sm="4"><SortHighLow></SortHighLow></Col>
                </Row>
            </Container>
            <Container>
            {/* <Album album={album} /> */}
            <Album />
            </Container>
            <Container>
                <Row>
                <Col xs="6" sm="4"></Col>
                <Col xs="6" sm="4"><CatalogIndex></CatalogIndex></Col>
                <Col sm="4"></Col>
                </Row>
                </Container>
        </main>
    );
};


function mapStateToProps(state) {
    return {
     products: state.products
    };
  }


  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Main); 