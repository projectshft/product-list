import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import SearchBar from './SearchBar';
import Results from './Results';
import { fetchProducts } from '../slices/resultsSlice';

// const sampleProducts = [
//   {
//     _id: {
//       $oid: '6503273dbf9241d7ce101420'
//     },
//     reviews: [
//       {
//         $oid: '6503273dbf9241d7ce101421'
//       },
//       {
//         $oid: '6503273dbf9241d7ce101423'
//       },
//       {
//         $oid: '6503273dbf9241d7ce101425'
//       },
//       {
//         $oid: '6503273dbf9241d7ce101427'
//       }
//     ],
//     category: 'outdoors',
//     name: 'Handmade Fresh Sausages',
//     price: 620,
//     image: 'https://via.placeholder.com/250?text=Product+Image',
//     __v: 0
//   },
//   {
//     _id: {
//       $oid: '6503273dbf9241d7ce1014b5'
//     },
//     reviews: [
//       {
//         $oid: '6503273dbf9241d7ce1014b6'
//       }
//     ],
//     category: 'outdoors',
//     name: 'Ergonomic Rubber Ball',
//     price: 518,
//     image: 'https://via.placeholder.com/250?text=Product+Image',
//     __v: 0
//   },
//   {
//     _id: {
//       $oid: '6503273cbf9241d7ce10138b'
//     },
//     reviews: [
//       {
//         $oid: '6503273cbf9241d7ce10138c'
//       },
//       {
//         $oid: '6503273cbf9241d7ce10138e'
//       },
//       {
//         $oid: '6503273cbf9241d7ce101390'
//       },
//       {
//         $oid: '6503273cbf9241d7ce101392'
//       },
//       {
//         $oid: '6503273cbf9241d7ce101394'
//       },
//       {
//         $oid: '6503273cbf9241d7ce101396'
//       },
//       {
//         $oid: '6503273cbf9241d7ce101398'
//       },
//       {
//         $oid: '6503273cbf9241d7ce10139a'
//       },
//       {
//         $oid: '6503273cbf9241d7ce10139c'
//       },
//       {
//         $oid: '6503273cbf9241d7ce10139e'
//       },
//       {
//         $oid: '6503273cbf9241d7ce1013a0'
//       },
//       {
//         $oid: '6503273cbf9241d7ce1013a2'
//       }
//     ],
//     category: 'clothing',
//     name: 'Awesome Rubber Sausages',
//     price: 605,
//     image: 'https://via.placeholder.com/250?text=Product+Image',
//     __v: 0
//   }
// ];

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
      <SearchBar />
      <Results />
    </>
  );
};

export default App;
