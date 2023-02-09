import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown'
import InputGroup from 'react-bootstrap/InputGroup'

const categories = [
  {value: 'Automotive'}, {value: 'Baby'}, {value: 'Beauty'}, {value: 'Books'}, {value: 'Clothing'}, {value: 'Computers'},
  {value: 'Electronics'}, {value: 'Games'}, {value: 'Garden'}, {value: 'Grocery'}, {value: 'Health'}, {value: 'Home'},
  {value: 'Industrial'}, {value: 'Jewelery'}, {value: 'Kids'}, {value: 'Movies'}, {value: 'Music'}, {value: 'Outdoors'},
  {value: 'Shoes'}, {value: 'Sports'}, {value: 'Tools'}, {value: 'Toys'}
]



function ProductSearch() {
  
  return (
    <Form>
      <Row>
      <InputGroup className="search w-50">
        <Form.Control
          placeholder="Product Name"
          aria-label="Search for product"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-secondary" id="button-addon2">
          Search
        </Button>
      </InputGroup>
        <Col>
        <Dropdown className="category"  >
        <Dropdown.Toggle id="dropdown-autoclose-true">
          Category
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#">Automotive</Dropdown.Item>
          <Dropdown.Item href="#">Baby</Dropdown.Item>
          <Dropdown.Item href="#">Beauty</Dropdown.Item>
          <Dropdown.Item href="#">Books</Dropdown.Item>
          <Dropdown.Item href="#">Clothing</Dropdown.Item>
          <Dropdown.Item href="#">Computers</Dropdown.Item>
          <Dropdown.Item href="#">Electronics</Dropdown.Item>
          <Dropdown.Item href="#">Games</Dropdown.Item>
          <Dropdown.Item href="#">Garden</Dropdown.Item>
          <Dropdown.Item href="#">Grocery</Dropdown.Item>
          <Dropdown.Item href="#">Health</Dropdown.Item>
          <Dropdown.Item href="#">Home</Dropdown.Item>
          <Dropdown.Item href="#">Industrial</Dropdown.Item>
          <Dropdown.Item href="#">Jewelery</Dropdown.Item>
          <Dropdown.Item href="#">Kids</Dropdown.Item>
          <Dropdown.Item href="#">Movies</Dropdown.Item>
          <Dropdown.Item href="#">Music</Dropdown.Item>
          <Dropdown.Item href="#">Outdoors</Dropdown.Item>
          <Dropdown.Item href="#">Shoes</Dropdown.Item>
          <Dropdown.Item href="#">Sports</Dropdown.Item>
          <Dropdown.Item href="#">Tools</Dropdown.Item>
          <Dropdown.Item href="#">Toys</Dropdown.Item>
           
        </Dropdown.Menu>
      </Dropdown>
        </Col>
        <Col>
        <Dropdown className="price" >
        <Dropdown.Toggle id="dropdown-autoclose-true">
          Price
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#">Highest</Dropdown.Item>
          <Dropdown.Item href="#">Lowest</Dropdown.Item>
        
        </Dropdown.Menu>
      </Dropdown>
        </Col>
      </Row>
    </Form>
  );
}

export default ProductSearch;