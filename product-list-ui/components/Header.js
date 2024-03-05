
import React from 'react';

const Header = () => {
  return (
    <div className='form-group d-flex'>
      <input className='form-control w-50' type='text'></input>
      <select className='form-select w-25' aria-label='Choose a category'>
        <option value='Jewelry'>Jewelry</option>
        <option value='Electronics'>Electronics</option>
        <option value='Men’s Clothing'>Men’s Clothing</option>
      </select>
      <select className='form-select w-25' aria-label='Sort by Price'>
        <option value='high-to-low'>High to Low</option>
        <option value='low-to-high'>Low to High</option>
      </select>
    </div>
  )
}

export default Header;