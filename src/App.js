import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import React, { useEffect } from 'react';
import { fetchProducts } from './actions';
import './index.css';


function App () {
  const products = useSelector((state) => state);
  const dispatch = useDispatch();
  const searchOptions = {
    searchQuery: '',
    filterCategory: '',
    sortPrice: ''
  }
  const Products = (props) => {
    return (
      <ProductGrid>
        <div>
          <ul>
            <li>{props.name}</li>
            <li>{props.category}</li>
            <li><img src={props.imgSrc} alt='product-img'/></li>
            <li>{props.price}</li>
          </ul>
        </div>
      </ProductGrid>
    )
  };

  const loadProducts = () => {

    useEffect(() => {
        dispatch(fetchProducts(searchOptions));
    }, []);
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

  const displayProducts = products.map((p) => {
    return <Products name = {p.productName}
                category = {p.productCategory}
                imgSrc={p.productImg}
                price = {p.productPrice}
      />
    });
  

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
                  <option value={'Electronics'}>Electronics</option>
                  <option value={'Tools'}>Tools</option>
                  <option value={'Home'}>Home</option>
                  <option value={'Music'}>Music</option>
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
    <ProductGrid>
      {loadProducts()}  
      {displayProducts}
    </ProductGrid>
    </div>
  )

}


export default App;

const ProductGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 2em;
  margin: 0 auto;
`;