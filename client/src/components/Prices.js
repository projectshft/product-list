import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sortPrice } from '../redux/actions'

const Prices = () => {
  const [price, setPrice] = useState('');
  const dispatch = useDispatch();

  // Price Dropdown
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  }

  // Submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sortPrice(price));
    console.log(e.target.value);
  }

  return (
    <form>
      <select value={price} onChange={handlePriceChange} className="menu-2">
        <option value="">Sort by Price</option>
        <option value="low">Lowest to Highest</option>
        <option value="high">Highest to Lowest</option>
      </select>

      <button onClick={handleSubmit} type="submit">Search</button>
    </form>

    );
  };

export default Prices;
