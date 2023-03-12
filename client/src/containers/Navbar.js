import { Navbar, Nav, Container, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch } from "react-redux";
import KeywordSearch from "./KeywordSearch";



const NavigationBar = () => {
  // component that renders navbar
  const dispatch = useDispatch;

  // retrieves users query in input and puts into local state


  // function that dispatches query results to the redux store on submit


  // function that dispatches random recipes to the redux store on click
 
 
 

  return (
  <Navbar bg="secondary" variant="dark" fixed="top">
    <Container>
      <Navbar.Brand href="/">Product Store</Navbar.Brand>
      <Nav className="me-auto">
         
      </Nav>
      <KeywordSearch />
    </Container>
  </Navbar>
  )
};

export default NavigationBar;