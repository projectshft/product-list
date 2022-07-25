import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchProducts } from './actions';
import './index.css';


function App () {
  const products = useSelector((state) => state.productList);
  const dispatch = useDispatch();
  const searchOptions = {
    searchQuery: '',
    filterCategory: '',
    sortPrice: ''
  }


  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line
  }, [fetchProducts]);

  function renderProducts() {
    return (
        <table className='products-table'>
          <tbody>
            <tr>Products</tr>
            <tr>{displayProducts()}</tr>
          </tbody>
        </table>
      )
  } 

  
  const getProducts = (event) => {    
    event.preventDefault();

    searchOptions.searchQuery = event.target['query'].value;
    searchOptions.filterCategory = event.target['category'].value;
    searchOptions.sortPrice = event.target['sort'].value;
    
    if(!event) {
      console.log('waiting for search');
    } else {
      dispatch(
        fetchProducts(searchOptions)
      )
    }
  }  

  const displayProducts = () => {
    if (!products) {
      return <div>No Products</div>;
    } else {
      return products.map((p) => 
          <tr>
            <td key={p.id}>
              <div className='product-display'>
                <ul>
                  <li>{p.productName}</li>
                  <li>{p.productCategory}</li>
                  <li><img src={p.productImg} alt='product-img'/></li>
                  <li>{p.productPrice}</li>
                </ul>
              </div>
            </td>
          </tr>
      )
    }
  }

  return (
    <div className='products'>
      <table className='search-table'>
        <thead>
          <tr>
            <th>Search</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <form onSubmit={getProducts}
              >
                <input className='search'
                  name='query'
                  >
                </input>
                <select className='form-control'
                  name='category'
                  value={searchOptions.category}
                  >
                  <option value={''}>Choose Category:</option>
                  <option value={'Toys'}>Toys</option>
                  <option value={'Automotive'}>Automotive</option>
                </select>
                <select className='price'
                  name='sort'
                  value={searchOptions.sort}
                  >
                  <option value={''}>Sort By:</option>
                  <option value={'highest'}>Highest</option>
                  <option value={'lowest'}>Lowest</option>
                </select>
                <button 
              className='btn btn-primary' type='submit'>Search</button>
              </form>
            </td>
          </tr>
        </tbody>
      </table>
      
      {renderProducts()}
    </div>
  )

}


export default App;