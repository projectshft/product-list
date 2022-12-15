import { Container } from 'react-bootstrap'
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';

import Search from './components/Search';
import ProductList from './components/ProductList';
import PageNumbers from './components/PageNumbers';

import {fetchProducts} from './helpers/fetchData'
import {setProducts, setCategories} from './actions'

function App() {
  const dispatch = useDispatch();

  const initialLoad = async() => {
    const { categories } = await fetchProducts();

    dispatch(setCategories(categories))
  }
  
  useEffect(() => {
    initialLoad();
  }, []);

  return (
    <div className="App">
      <Container>
        <Search />
        <ProductList />
        <PageNumbers />
      </Container>
    </div>
  );
}

export default App;
