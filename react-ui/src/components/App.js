import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import SearchBar from './SearchBar';
import Results from './Results';
import PageNavigation from './PageNavigation';
import { fetchProducts } from '../slices/resultsSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <SearchBar />
      <Results />
      <PageNavigation />
    </>
  );
};

export default App;
