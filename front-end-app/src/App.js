import Filters from './components/Filters.js';
import Products from './components/Products.js';
import PageLinks from './components/PageLinks.js';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <Filters />
      <Products />
      <PageLinks />
    </Container>
  );
}

export default App;
