import React from 'react';
import Catalog from './Catalog';
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
                        Shop from the most fabulously, randomly summoned catalog on Earth. Premium prices, bargain products, and movies about concrete await!
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
            <Catalog />
            </Container>
            <Container>
                <Row>
                <Col><CatalogIndex></CatalogIndex></Col>
                </Row>
                </Container>
        </main>
    );
};
  
  export default Main; 