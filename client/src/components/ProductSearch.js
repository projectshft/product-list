import React, {useState} from 'react'

const ProductSearch = () => {
  const [inputValue, setInputValue] = useState('');
  const [productQuery, setProductQuery] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClick = () => {
    setProductQuery(inputValue);
    setInputValue('');
  };

  console.log({productQuery})
  
  return (
    <div id="search-container">
   <div>
      <div>
        <input type="text" 
        placeholder="Search for product"
        value={inputValue}
        onChange={handleChange} />
      </div>
    
      <button onClick={handleClick} >Search</button>
    </div>
    </div>
    );
  }
  
export default ProductSearch;

