import Product from './Product';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getCount } from "../store"
import Page from './Page';

function ProductList() {
  const dispatch = useDispatch();


  // const [sortPrice, setSortPrice] = useState('highest');
  const [sortCategory, setSortCategory] = useState('All');

  let { data } = useSelector((state) => {
    console.log(state.products,'state.products')
    return state.products
  });
  let { count } = useSelector((state) => {
    console.log(state.count,'state.count')
    return state.count
  });


  useEffect(() => {
    dispatch(getProducts({ page: 1, category: sortCategory }));
    dispatch(getCount());
  }, [dispatch, sortCategory]);

  const pages = [];
  for (let i = 0; i < Math.ceil(count / 9); i++) {
    pages.push(i + 1);
  }

  const handlePageChange = (pageNumber) => {
    console.log(`page: ${pageNumber}`);
    dispatch(getProducts({ page: pageNumber, category: sortCategory }));
  }

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSortCategory(selectedCategory === 'All' ? '' : selectedCategory);
  }


  const renderedPages = pages.map((page) => {
    return (
      <div className='pageList' key={page}>
        <Page number={page} onPageChange={handlePageChange}></Page>
      </div>
    );
  });
  
  const renderedProducts = data.map((product) => {
    console.log(product, 'testing rendered products')
    return (
      <div className='list-container' key={product._id}>
        <Product price={product.price} category={product.category} image={product.image} name={product.name}/>
      </div>
    )
  })

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