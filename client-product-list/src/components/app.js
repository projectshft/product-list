import SearchBar from './search-bar';
import ProductList from '../containers/product-list';
import Paginate from './paginate';
import Container from 'react-bootstrap/Container';
 
const app = () => {
  return (
    <Container>
      <SearchBar />
      <ProductList />
      <Paginate />
    </Container>
  )
};

export default app;