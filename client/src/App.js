import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import { addProducts } from './actions';

function App() {
  const initialState = {
    page: 1,
    category: '',
    price: '',
    query: '',
  };

  const [ state, setState ] = useState(initialState);
  
  const selectCategories = (state) => state.categories;
  const categories = useSelector(selectCategories)

  const updateState = (field, value) => {
    setState({...state, [field]: value});
  };

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(addProducts(state));
  }, [dispatch, state])

  if (!categories) return <></>

  return (
    <div className="container py-4">
      <Search state={state} updateState={updateState} setState={setState} />
      <SearchResults state={state} />
    </div>
  );
}

export default App;