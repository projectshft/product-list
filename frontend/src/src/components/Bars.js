import { useDispatch } from 'react-redux';
import { combo, fetchProduct } from '../action';
import { useEffect } from 'react';
import '../App.css';

const Bars = ({
  currentPage,
  price,
  setPrice,
  category,
  setCategory,
  query,
  setQuery,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct());
  }, []);

  const handlePriceDropdown = (e) => {
    setPrice(e.target.value);
    dispatch(combo(currentPage, e.target.value, category, query));
  };

  const handleCategoryDropdown = (e) => {
    setCategory(e.target.value);
    dispatch(combo(currentPage, price, e.target.value, query));
  };

  const handleQuerySearch = (e) => {
    setQuery(e.target.value);
    dispatch(combo(currentPage, price, category, e.target.value));
  };

  const categoryOptions = [
    'Computers',
    'Grocery',
    'Clothing',
    'Toys',
    'Shoes',
    'Music',
    'Tools',
    'Jewelery',
    'Health',
    'Beauty',
    'Outdoors',
    'Automotive',
    'Books',
    'Industrial',
    'Kids',
    'Games',
    'Home',
  ];

  return (
    <div className='input-group mb-8'>
      <input
        type='text'
        className='form-control'
        placeholder='Search'
        onChange={handleQuerySearch}
      />
      <select
        name='category'
        id='category-select'
        onChange={handleCategoryDropdown}
      >
        <option value=''>Sort by Category</option>
        {categoryOptions.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>

      <select name='price' id='price-select' onChange={handlePriceDropdown}>
        <option value=''>Sort by Price</option>
        <option value='highest'>highest</option>
        <option value='lowest'>lowest</option>
      </select>
    </div>
  );
};

export default Bars;
