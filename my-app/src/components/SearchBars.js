import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap";

const SearchBars = () => {



  return (
    <Form>
      <Row className="mt-5 px-0">
        <Col xs={8} className="px-1">
          <Form.Control placeholder="Search" className="pr-4"/>
        </Col>
        <Col className="px-1">
          <Form.Control placeholder="Sort by Category" />
        </Col>
        <Col className="px-1">
          <Form.Control placeholder="Sort by Price" />
        </Col>
      </Row>
    </Form>
  )
}

export default SearchBars;