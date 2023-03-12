import { Navbar, Nav, Container, } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';
import KeywordSearch from "./KeywordSearch";
import CategorySearch from "./CategorySearch";
import SortByPrice from "./SortByPrice";
import NameSearch from "./NameSearch";



const NavigationBar = () => {
  // component that renders navbar

 
 

  return (
  <Navbar bg="secondary" variant="dark" fixed="top">
    <Container>
      <Navbar.Brand>Product Store</Navbar.Brand>
      <Nav className="me-auto">
         <NameSearch />
      </Nav>
      <CategorySearch />
      <SortByPrice />
      <KeywordSearch />
    </Container>
  </Navbar>
  )
};

export default NavigationBar;