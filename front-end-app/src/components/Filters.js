import {Container, Row, Col, Form} from 'react-bootstrap';

const Filters = () => {
  return (
    <div className="filter-bar">
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Control placeholder='Search By Product Name' onChange={(test) => {console.log(test)}}/>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Select onChange={(e) => {console.log(e)}}>
              <option>Filter By Category</option>
              <option>Tools</option>
              <option>Garden</option>
              <option>Health</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Select onChange={(e) => {console.log(e)}}>
              <option>Filter By Price</option>
              <option>Lowest to Highest</option>
              <option>Highest to Lowest</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </div>
  )
};

export default Filters;