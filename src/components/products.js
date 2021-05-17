import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProducts } from "../actions";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Main = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProducts]);

  const handleSearchClick = () => {
    
    dispatch(fetchProducts("query", query));
  }

  const handleEnterPress = (e) => {
  if (e.keyCode === 13) {
    handleSearchClick();
    }
  };

  function renderSearchAndFilter() {
    return (
      <div className ="container">
        <div className="row">
          <div className ="col-md-6">
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search"
              type="text"
              onKeyDown={handleEnterPress}
              value={query}
              onChange={event => {
                setQuery(event.target.value)
              }}
            />
            <Button onClick={handleSearchClick} variant="primary">Search</Button>
          </InputGroup>
          </div>
          <div className ="col-md-3">
            <DropdownButton id="dropdown-basic-button" onSelect={eventKey => dispatch(fetchProducts("category", eventKey))} title="Sort By Category">
              <Dropdown.Item eventKey="Beauty">Beauty</Dropdown.Item>
              <Dropdown.Item eventKey="Electronics">Electronics</Dropdown.Item>
              <Dropdown.Item eventKey="Sports">Sports</Dropdown.Item>
            </DropdownButton>
          </div>
          <div className ="col-md-3">
            <DropdownButton id="dropdown-basic-button" onSelect={eventKey => dispatch(fetchProducts("price", eventKey))} title="Sort By Price">
              <Dropdown.Item eventKey="highest">highest</Dropdown.Item>
              <Dropdown.Item eventKey="lowest">lowest</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    )
  }

  function pagination() {
    return (
      <div className="container">
        <div className="row">           
          <div className="col-md-8 offset-md-4">
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example"
            onSelect = {eventKey => dispatch(fetchProducts("page", eventKey))}>
              <Tab eventKey="1" title="1">
              </Tab>
              <Tab eventKey="2" title="2">
              </Tab>
              <Tab eventKey="3" title="3">
              </Tab>
              <Tab eventKey="4" title="4">
              </Tab>
              <Tab eventKey="5" title="5">
              </Tab>
              <Tab eventKey="6" title="6">
              </Tab>
              <Tab eventKey="7" title="7">
              </Tab>
              <Tab eventKey="8" title="8">
              </Tab>
              <Tab eventKey="9" title="9">
              </Tab>
              <br></br>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }

  const productCard = () => {
    return products.map((product, i) => (
    <div className="col-md-4" key={product.id}>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
        <Card.Text>
            Category: <strong>{product.category}</strong>
          </Card.Text>
          <Card.Text>
            Price: <strong>${product.price}</strong>
          </Card.Text>
          </Card.Body>
        <Card.Img variant="top" src="https://via.placeholder.com/250?text=Product+Image"/>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
        </Card.Body>
      </Card>
      <br></br>
    </div>
    ));
  }

  function renderProducts() {
    return (
      <div className="container">
        <div className="row">
          {productCard()} 
        </div>
      </div>
    )
  }

  return (
    <div>
      {renderSearchAndFilter()}
      {renderProducts()}
      {pagination()}
    </div> 
  )
}

export default Main;