import React, { useState, useEffect, useCallback } from 'react';
import ProductList from '../components/ProductList';
import Search from '../components/Search';
import FilterByCategory from '../components/FilterByCategory';
import Sort from '../components/SortByPrice';
import '../assets/styles/global.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOption, setSortOption] = useState('asc');
  const [category, setCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/products?page=${currentPage}&limit=9&category=${category}&sort=${sortOption}`
      );
      const data = await response.json();
      setProducts(data.products || []);
      setFilteredProducts(data.products || []);
      setTotalPages(data.totalPages); 
      
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, [currentPage, category, sortOption]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    let updatedProducts = [...products];

    // Filter by category
    if (category !== 'all') {
      updatedProducts = updatedProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by search query
    if (searchQuery) {
      updatedProducts = updatedProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  }, [category, products, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1); // Reset to first page on category change
  };

  const handleDelete = async (productId) => {
    try {
      await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
      });
      console.log("Product deleted successfully");

      // Update both products and filteredProducts states
      setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
      setFilteredProducts((prevFiltered) => prevFiltered.filter(product => product._id !== productId));
      
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="home-page">
      <div className="filter-bar">
        <header>
          <div className="controls">
            <Search onSearch={handleSearch} />
            <Link to="/add-product">
              <button>Add Product</button>
            </Link>
            <FilterByCategory onCategoryChange={handleCategoryChange} />
            <Sort onSort={handleSort} />
          </div>
        </header>
      </div>
      <div className="product-list">
        <ProductList
          onDelete={handleDelete}
          products={filteredProducts}
          sortOption={sortOption}
          searchQuery={searchQuery}
          totalPages={totalPages}
          currentPage={currentPage}
          category={category}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default HomePage;
