import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from './containers/Navbar';

const App = () => {
  return (
  <>
    <NavBar />
    <Container className="md-4">
    </Container>
  </>
  )
}

export default App