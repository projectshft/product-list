import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from "react-redux";
import KeywordSearch from "./KeywordSearch";
import CategorySearch from "./CategorySearch";



const NavigationBar = () => {
  // component that renders navbar

 
 

  return (
  <Navbar bg="secondary" variant="dark" fixed="top">
    <Container>
      <Navbar.Brand href="/">Product Store</Navbar.Brand>
      <Nav className="me-auto">
         
      </Nav>
      <CategorySearch />
      <KeywordSearch />
    </Container>
  </Navbar>
  )
};

export default NavigationBar;