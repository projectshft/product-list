import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductsView = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);

  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const categoryOptions = [
    { value: 'games', label: 'Games' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'music', label: 'Music' }
  ];
  
  const priceOptions = [
    { value: 'higest', label: 'Price: High to Low' },
    { value: 'lowest', label: 'Price: Low to High' }
  ];

  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = selectedOption => {
    setCategory(selectedOption.target.value);
  };
  
  const handlePriceChange = selectedOption => {
    setPrice(selectedOption.target.value);
  };

  const handlePageNumClick = page => {
    setCurrentPage(page);
  }

  const constructQueryString = () => {
    let queryString = '';
    if (currentPage) {
      queryString += `page=${currentPage}&`;
    }
    if (searchQuery) {
      queryString += `query=${searchQuery}&`;
    }
    if (category) {
      queryString += `category=${category}&`;
    }
    if (price) {
      queryString += `price=${price}&`;
    }
    if (queryString.length > 0) {
      queryString = `?${queryString.slice(0, -1)}`;
    }
    return queryString;
  };

  useEffect(() => {
    const queryString = constructQueryString();
    const endpoint = `http://localhost:8000/products${queryString}`;
    dispatch(getProducts(endpoint));
  }, [category, price, searchQuery, currentPage]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <input type="text" value={searchQuery} onChange={handleSearchInputChange} placeholder="Search products..." className="form-control"/>
        </div>
        <div className="col-md-2">
          <select value={category} onChange={handleCategoryChange} className="form-control">
            <option value="">Select a category</option>
            {categoryOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <select value={price} onChange={handlePriceChange} className="form-control">
            <option value="">Sort by price</option>
            {priceOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        <h2 className='text-center m-4'>FullStack Shopping</h2>
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card">
                <img src={product.image} alt="placeholder image" className="card-img-top"  style={{width: 'auto', height: '350px'}} />
                <div className="card-body">
                  <h3 className="card-title">{product.name}</h3>
                  <p className="card-text">{product.description}</p>
                  <strong>
                    <p className="card-text">Price: ${product.price}</p>
                  </strong>
                  <p className="card-text">Category: {product.category}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
      <div className='text-center'>
        {[...Array(11)].map((_, i) => (
          <a key={i+1} value={i+1} className="m-3" onClick={() => handlePageNumClick(i+1)}>
            {i+1}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductsView;
