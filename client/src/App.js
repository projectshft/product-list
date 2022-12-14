import { Container } from 'react-bootstrap'
// import {  } from 'react-redux';
import { useEffect } from 'react';

import Search from './components/Search';
import ProductList from './components/ProductList';
import PageNumbers from './components/PageNumbers';

import {fetchProducts} from './helpers/fetchData'

function App() {
  const initialLoad = async() => {
    fetchProducts();
  }
  
  useEffect(() => {
    initialLoad();
  }, []);

  return (
    <div className="App">
      <Container>
        <Search />
        {/* <ProductList />
      <PageNumbers /> */}

      </Container>
    </div>
  );
}

export default App;
