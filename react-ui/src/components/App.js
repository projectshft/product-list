import SearchBar from './SearchBar';
import Results from './Results';

const sampleProducts = [
  {
    _id: {
      $oid: '6503273dbf9241d7ce101420'
    },
    reviews: [
      {
        $oid: '6503273dbf9241d7ce101421'
      },
      {
        $oid: '6503273dbf9241d7ce101423'
      },
      {
        $oid: '6503273dbf9241d7ce101425'
      },
      {
        $oid: '6503273dbf9241d7ce101427'
      }
    ],
    category: 'outdoors',
    name: 'Handmade Fresh Sausages',
    price: 620,
    image: 'https://via.placeholder.com/250?text=Product+Image',
    __v: 0
  },
  {
    _id: {
      $oid: '6503273dbf9241d7ce1014b5'
    },
    reviews: [
      {
        $oid: '6503273dbf9241d7ce1014b6'
      }
    ],
    category: 'outdoors',
    name: 'Ergonomic Rubber Ball',
    price: 518,
    image: 'https://via.placeholder.com/250?text=Product+Image',
    __v: 0
  }
];

const App = () => (
  <>
    <SearchBar />
    <Results products={sampleProducts} />
  </>
);

export default App;
