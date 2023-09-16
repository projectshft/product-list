/**
 * @component
 * Component for rendering app
 */

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import SearchBar from './SearchBar';
import Results from './Results';
import PageNavigation from './PageNavigation';
import { fetchProducts } from '../slices/resultsSlice';

const App = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);
  const category = useSelector((state) => state.search.category);
  const price = useSelector((state) => state.search.price);

  // Render new results whenever search parameters change
  useEffect(() => {
    dispatch(fetchProducts({ query, category, price, page: 1 }));
  }, [dispatch, query, category, price]);

  return (
    <>
      <SearchBar />
      <Results />
      <PageNavigation />
    </>
  );
};

export default App;
