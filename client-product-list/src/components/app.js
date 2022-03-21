import SearchBar from '../containers/search-bar';
import ProductList from '../containers/product-list';
import Paginate from '../containers/paginate';
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