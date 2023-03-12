import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './containers/Navbar';
import ProductDisplay from './containers/ProductDisplay';

const App = () => {
  return (
  <>
    <NavBar />
    <Container className="md-4">
      <ProductDisplay />
    </Container>
  </>
  )
}

export default App