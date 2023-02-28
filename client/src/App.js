import SearchBar from './components/SearchBar'
import './App.css';
import ProductList from './components/ProductList';
import FilterDropdown from './components/FilterDropdown';
import AlexaImage from './images/alexa.png';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from './actions/index';

const App = () => {
  const productArray = [{
    price:200,
    category: 'food',
    name: 'apple',
    image: AlexaImage,
  },
  {
    price:200,
    category: 'food',
    name: 'apple',
    image: AlexaImage,
  },
  {
    price:200,
    category: 'food',
    name: 'apple',
    image: AlexaImage,
  },
  {
    price:200,
    category: 'food',
    name: 'apple',
    image: AlexaImage,
  },
  {
    price:200,
    category: 'food',
    name: 'apple',
    image: AlexaImage,
  },
  {
    price:200,
    category: 'food',
    name: 'apple',
    image: AlexaImage,
  },
  {
    price:200,
    category: 'food',
    name: 'apple',
    image: AlexaImage,
  },
  {
    price:200,
    category: 'food',
    name: 'apple',
    image: AlexaImage,
  },
  {
    price:200,
    category: 'food',
    name: 'apple',
    image: AlexaImage,
  }
];
const [array, setArray] = useState([]);

const dispatch = useDispatch();
const productPiece = useSelector((state) => state.products);


useEffect(() => {
    dispatch(getProduct())
    console.log(productPiece, 'product piece app')
  }, [dispatch]);


  return (
    <div>
      
      <SearchBar/>
      <FilterDropdown title={'title'} options={[]}/>
      <ProductList productArray={array}/>      
      
    </div>
  );
};

export default App;
