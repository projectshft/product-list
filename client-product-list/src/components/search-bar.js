import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown  from 'react-bootstrap/Dropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

const searchBar = () => {
  return (
    <>
      <Row>
        <Col md={8}>
          <FormControl aria-label="Text input with dropdown button" placeholder="Search" />
        </Col>
        <Col md={2}>
          <DropdownButton
            variant="outline-secondary"
            title="Sort By Category..."
            id="input-category-dropdown"
            align="end"
          >
            <Dropdown.Item>Tools</Dropdown.Item>
            <Dropdown.Item>Shoes</Dropdown.Item>
            <Dropdown.Item>Outdoors</Dropdown.Item>
            <Dropdown.Item>Toys</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col md={2}>
          <DropdownButton
            variant="outline-secondary"
            title="Sort By Price..."
            id="input-price-dropdown"
            align="end"
          >
            <Dropdown.Item>High to Low</Dropdown.Item>
            <Dropdown.Item>Low to High</Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
    </>
  )
};

export default searchBar;