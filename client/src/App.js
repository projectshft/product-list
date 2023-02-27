import SearchBar from './SearchBar';
import './App.css';
import ProductList from './ProductList';
import FilterDropdown from './FilterDropdown';
import AlexaImage from './images/alexa.png';

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
  return (
    <div>
      
      <SearchBar/>
      <FilterDropdown title={'title'} options={[]}/>
      <ProductList productArray={productArray}/>      
      
    </div>
  );
};

export default App;