import React from 'react';

const SearchBar = () => (
  <div className='col-md-4'>
    <div className='form-group row'>
      <label htmlFor='inputSearch' className='col-sm-2 col-form-label'>
        search
      </label>
      <div className='col-sm-10'>
        <input type='text' className='form-control form-control-sm' id='inputSearch' placeholder='Enter your search'></input>
      </div>
    </div>
  </div>
);

export default SearchBar;