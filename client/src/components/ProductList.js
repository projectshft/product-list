import Product from './Product';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getCount } from "../store"
import Page from './Page';

function ProductList() {
  const dispatch = useDispatch();

  const [sortCategory, setSortCategory] = useState('All');
  const [sortPrice, setSortPrice] = useState('');

  let { data } = useSelector((state) => {
    return state.products
  });
  let { count } = useSelector((state) => {
    return state.count
  });

  useEffect(() => {
    dispatch(getProducts({ page: 1, category: sortCategory, price: sortPrice }));
    dispatch(getCount());
  }, [dispatch, sortCategory, sortPrice]);

  const pages = [];
  for (let i = 0; i < Math.ceil(count / 9); i++) {
    pages.push(i + 1);
  }

  const handlePageChange = (pageNumber) => {
    dispatch(getProducts({ page: pageNumber, category: sortCategory, price: sortPrice }));
  }

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSortCategory(selectedCategory === 'All' ? '' : selectedCategory);
  }

  const handlePriceChange = (event) => {
    setSortPrice(event.target.value);
  }


  const renderedPages = pages.map((page) => {
    return (
      <div className='pageList' key={page}>
        <Page number={page} onPageChange={handlePageChange}></Page>
      </div>
    );
  });
  
  const sortProductsPrice = () => {
    const sortedProducts = [...data];
    if (sortPrice === 'highest') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortPrice === 'lowest') {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    return sortedProducts;
  }

  const renderedProducts = sortProductsPrice().map((product) => {
    return (
      <div className='list-container' key={product._id}>
        <Product price={product.price} category={product.category} image={product.image} name={product.name}/>
      </div>
    );
  });

  return (
    <div className='product-list-container'>
      <div className='sort-container'>
        <label htmlFor="category">Sort by category:</label>
        <select id="category" value={sortCategory} onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="Tools">Tools</option>
          <option value="Toys">Toys</option>
          <option value="Food">Food</option>
          <option value="Home">Home</option>
          <option value="Beauty">Beauty</option>
          <option value="Kids">Kids</option>
          <option value="Health">Health</option>
          <option value="Shoes">Shoes</option>
          <option value="Outdoors">Outdoors</option>
          <option value="Garden">Garden</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Books">Books</option>
          <option value="Movies">Movies</option>
          <option value="Automotive">Automotive</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Computer">Computer</option>
          <option value="Baby">Baby</option>
          <option value="Industrial">Industrial</option>
          <option value="Jewelery">Jewelery</option>
          <option value="Grocery">Grocery</option>
          <option value="Sports">Sports</option>
        </select>
        <label htmlFor="price">Sort by price:</label>
        <select id="price" value={sortPrice} onChange={handlePriceChange}>
          <option value="">None</option>
          <option value="highest">Highest to lowest</option>
          <option value="lowest">Lowest to highest</option>
        </select>
      </div>
      <div className='list-container'>
        {renderedProducts}
      </div>
      <div className='count-container'>
        Products: {count}
      </div>
      <div className='pagination-container'>
        {renderedPages}
      </div>
    </div>
  )
};

export default ProductList;