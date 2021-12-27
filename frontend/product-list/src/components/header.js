import SearchBar from "./search-bar";
import { Link } from 'react-router-dom';

import {Container, Row, Col, Button} from "react-bootstrap";

const Header = (props) => {
  return (
    <div>
      <div className='bg-dark p-2 rounded-lg text-center'>
        <Container>
          <Row>
            <Col lg={2}>
            <Link 
              to={'/products'} 
              style={{textDecoration:'none'}}
              >
              <h2>
                rando.com  
              </h2>
              </Link>
            </Col>
            <Col lg={8}>
              <SearchBar />
            </Col>
            <Col lg={2}>
              <Link to={'/products/new'}>
                <Button variant="primary" className="add-product"> <strong> Add Product </strong></Button>
              </Link>
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