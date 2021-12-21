import SearchBar from "./search-bar";
import {Container, Row, Col, Button} from "react-bootstrap";

const Header = (props) => {
  return (
    <div>
      <div className='bg-dark p-2 rounded-lg text-center'>
        <Container>
          <Row>
            <Col lg={2}>
              <h2>rando.com</h2>
            </Col>
            <Col lg={8}>
              <SearchBar />
            </Col>
            <Col xs={2}>
            <Button
              variant="primary"
              className="add-product"
            >
              Add Product
            </Button>
            </Col>   
          </Row>
        </Container>
      </div>
      <div className='container'>
        {props.children}
      </div>
    </div>
  )
};

export default Header;