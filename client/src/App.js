import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './containers/Navbar';
import ProductDisplay from './containers/ProductDisplay';
import './index.css';
import Paginate from './containers/Paginate';

const App = () => {
  return (
  <>
    <Container fluid>
      <NavBar />
    </Container>
    <Container className="md-4 mt-50">
      <ProductDisplay />
      <Paginate />
    </Container>
  </>
  )
}

export default App