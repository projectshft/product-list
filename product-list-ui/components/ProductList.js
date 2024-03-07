import React, { useEffect, useState } from 'react';
import ProductListItem from './ProductListItem';
import axios from 'axios';

const ProductList = () => {
  
  const [pages, setPages] = useState(0);
  const [filter, setFilter] = useState({ category: '', price: '' });
  const [buttons, setButtons] = useState([]);
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchProducts = async (page, category, price, search) => {
    let pageURL;
    let categoryURL;
    let priceURL;
    let searchURL;
  
    if(page === undefined) {
      pageURL = 1;
    } else {
      pageURL = page;
    }
  
    if(category) {
      categoryURL = `&category=${category}`;
    }
    if(price) {
      priceURL = `&price=${price}`;
    }
    if(search) {
      searchURL = `&search=${search}`;
    }
  
    const url = `http://localhost:8000/api/products?page=${pageURL}${categoryURL || ''}${priceURL || ''}${searchURL || ''}`;
    console.log(url)
    const response = await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  
    return response;
  }


  const getInitialProducts = async () => {

    const products = await axios.get('http://localhost:8000/api/products', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })

    const categories = await axios.get('http://localhost:8000/api/categories', {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
    
    setProducts(products.data.products);
    setPages(products.data.pages)
    setCategories(categories.data);
  }


  useEffect(() => {
    getInitialProducts();
  }
  , []);

  useEffect(() => {
    setButtons(generatePageButtons());
  }, [pages]);

  const getNewPage = async (page) => {
    const products = await fetchProducts(page, filter.category || null, filter.price || null, search || null);
    setProducts(products.data.products);
  }

  const generatePageButtons = () => {

    let newButtons = []
    for(let i = 1; i <= pages; i++) {
      newButtons.push(<button key={i} onClick={() => getNewPage(i)}>{i}</button>)
    }
    return newButtons;
  }


  const updateCategoryFilter = async (e) => {
    setFilter({ ...filter, category: e.target.value });
    const response = await fetchProducts( 1, e.target.value || null, filter.price || null, search || null)
    console.log(response)
    const pageNum = await response.data.pages;
    setPages(Math.ceil(pageNum))
    setProducts(response.data.products)
  }

  const updatePriceFilter = async (e) => {
    setFilter({ ...filter, price: e.target.value });
    const response = await fetchProducts( 1, filter.category || null, e.target.value || null, search || null)
    setProducts(response.data.products)
  }

  useEffect(() => {
    const searchFetchData = async () => {
      const response = await fetchProducts(1, filter.category || null, filter.price || null, search);
      setProducts(response.data.products);
      console.log(response.data.pages);
      setPages(response.data.pages);
    };

    searchFetchData();
  }, [search, filter.category, filter.price]);

  const searchProducts = (e) => {
    setSearch(e.target.value);
  }
  
  return (
    <div>
    <div className='form-group d-flex'>
    <input className='form-control w-50' type='text' onChange={(e) => searchProducts(e)}></input>
    <select className='form-select w-25' onChange={updateCategoryFilter} aria-label='Choose a category'>
      <option value=''>Choose a category</option>
      {categories.map(category => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
    <select className='form-select w-25' aria-label='Sort by Price' onChange={updatePriceFilter}>
      <option value=''>Sort by Price</option>
      <option value='high-to-low'>High to Low</option>
      <option value='low-to-high'>Low to High</option>
    </select>
  </div>
    <div>
    <div className='d-flex flex-wrap justify-content-center'>
      {products.map(product => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
    <div className='text-center'>
      Pages {buttons}
    </div>
    </div>
    </div>
  );
}

export default ProductList;