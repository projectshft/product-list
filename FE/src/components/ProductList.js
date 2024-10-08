import React from 'react';
import '../assets/styles/ProductList.css'; // Adjust path if ProductList.js is in a different directory
import { Link } from 'react-router-dom';

const ProductList = ({ products, onDelete, currentPage, totalPages, onPageChange }) => {
  console.log('Total Pages:', totalPages);

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };
  if (totalPages <= 0) {
    return <p>No pages available</p>; // Render message if no pages are available
  }

  return (
    <div>
      <div className="product-list">
        <div className="product-grid">
          {products.length ? (
            products.map(product => (
              <div key={product._id} className="product-box">
                <Link to={`/products/${product._id}`} className="product-link">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>Category: {product.category}</p>
                    <p>Price: ${product.price}</p>
                  </div>
                </Link>
                <button onClick={() => onDelete(product._id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
      <footer>
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default ProductList;
