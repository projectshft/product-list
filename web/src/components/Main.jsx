import React from 'react';
import Album from './Album';
import CategorySelector from './CategorySelector'
import SortHighLow from './SortHighLow'
import SearchBox from './SearchBox'
import CatalogIndex from './CatalogIndex'
import { Container, Row, Col, Jumbotron, Pagination } from 'reactstrap';

const Main = ({ album }) => {
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
            <Album album={album} />
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

export default Main;
// don't think I need state stuff
/* function mapStateToProps(state) {
    return {
   //   destinations: state.destinations,
     // selectedRadius: state.selectedRadius,
    };
  }
  
  function mapDispatchToProps(dispatch) {
  //  return bindActionCreators({ sendDistance, fetchDestination }, dispatch);
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(App); */