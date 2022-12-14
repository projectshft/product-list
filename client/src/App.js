import { Container } from 'react-bootstrap'
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';

import Search from './components/Search';
import ProductList from './components/ProductList';
import PageNumbers from './components/PageNumbers';

import {fetchProducts} from './helpers/fetchData'
import {setProducts} from './actions'

function App() {
  const dispatch = useDispatch();

  const initialLoad = async() => {
    const products = await fetchProducts();

    dispatch(setProducts(products))
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
