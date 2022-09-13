import { useDispatch, useSelector } from 'react-redux';
import { combo, fetchProduct } from '../action';
import { useState } from 'react';
import '../App.css';

const Bars = () => {
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  window.onload = () => dispatch(fetchProduct());

  const handlePriceDropdown = (e) => {
    setPrice(e.target.value);
    // console.log('!!', price, category);
    dispatch(combo(null, e.target.value, category, query));
  };

  const handleCategoryDropdown = (e) => {
    setCategory(e.target.value);
    console.log('@@', price, category);
    // console.log('currentPage: ??', currentPage);
    dispatch(combo(null, price, e.target.value, query));
  };

  const handleQuerySearch = (e) => {
    setQuery(e.target.value);
    // console.log('##', price, category, query);
    dispatch(combo(null, price, category, e.target.value));
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
