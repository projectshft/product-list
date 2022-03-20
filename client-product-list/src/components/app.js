import SearchBar from './search-bar';
import ProductList from '../containers/product-list';
import Container from 'react-bootstrap/Container';
 
const app = () => {
  return (
    <Container>
      <SearchBar />
      <ProductList />
    </Container>
  )
};

export default app;